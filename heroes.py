import dota2api
import json
import os
api = dota2api.Initialise(json.load(open('config.json'))['steamApiKey'])
heroes = api.get_heroes()
if not os.path.exists('build'):
    os.makedirs('build')
open('build/dota2heroes.json', 'w').write(json.dumps(heroes, indent=4, sort_keys=True))