import requests
from dotenv import load_dotenv
import os

load_dotenv()
NOTION_API = os.getenv('NOTION_API')
NOTION_DATABASE_ID = os.getenv('NOTION_DATABASE_ID')


class Entry:
    def __init__(self, id, name, height, imageUrl, categories, sources):
        self.id: int = id
        self.name: str = name
        self.height: int = height
        self.image_url: str = imageUrl
        self.categories: str = categories
        self.sources: str = sources

    def __str__(self):
        return ", ".join(map(str, self.toList()))

    def toList(self) -> list[str | int]:
        return [self.id, self.name, self.height, self.image_url, self.categories, self.sources]


def get_notion_entries() -> list[Entry]:
    data: list[Entry] = []

    headers = {
        'Authorization': f"Bearer {NOTION_API}",
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
    }

    not_done = True
    start_cursor = ''
    while (not_done):
        body = {}
        if start_cursor != '':
            body = {
                'start_cursor': start_cursor
            }

        response = requests.post(f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query", headers=headers, json=body)
        if response.status_code != 404:
            json = response.json()

            for row in json['results']:
                props = row['properties']

                id = props['ID']['unique_id']['number']
                name = props['Name']['title'][0]['plain_text']
                height = props['Height (cm)']['number']
                imageUrl = props['Image URL']['url']
                categories = f"[{','.join(list(map(lambda x: x['name'], props['Tags']['multi_select'])))}]"
                sources = f"[{','.join(list(map(lambda x: x['name'], props['Source']['multi_select'])))}]"

                data.append(Entry(id, name, height, imageUrl, categories, sources))

            if json['has_more']:
                start_cursor = json['next_cursor']
            else:
                not_done = False

    data.sort(key=lambda x: x.id)

    return data
