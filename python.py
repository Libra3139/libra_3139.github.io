import ollama
import asyncio
import websockets

async def handle_message(websocket, path):
    async for message in websocket:
        use_line = message.strip()
        key_word = use_line[:1].lower()
        if key_word == "+":
            use_line = use_line[1:] + "(請使用繁體中文回答)"
            response = ollama.chat(model='llama3', messages=[
                {
                    'role': 'user',
                    'content': use_line,
                },
            ])
            ai_ans = response['message']['content']
            await websocket.send(ai_ans)
        else:
            await websocket.send(message)    

start_server = websockets.serve(handle_message, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()