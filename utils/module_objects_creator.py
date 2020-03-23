#!/usr/bin/env python3

import yaml
import argparse
import json

parser = argparse.ArgumentParser(description='Takes modules.')
parser.add_argument('filename', type=str, help='name of yaml file')

args = parser.parse_args()
path = './images/svg/modules/'

with open(args.filename) as f:
    data = yaml.load(f, Loader=yaml.Loader)
    modules = data['modules']
    modules = sorted(modules)

keys = ['name', 'image', 'image_selected']
keys = sorted(keys)

objects = {}

objects.update(
    {
        "audioin": {
            "name": "audio-in",
            "image": path + "audioin.svg",
            "image_selected": path + "audioin_selected.svg",
            "image_menu": path + "audioin_menu.svg",
            "last": False
        }
    }
)

objects.update(
    {
        "audioout": {
            "name": "audio-out",
            "image": path + "audioout.svg",
            "image_selected": path + "audioout_selected.svg",
            "image_menu": path + "audioout_menu.svg",
            "last": True 
        }
    }
)

for m in modules:
    for k in keys:
        temp = {
            m: {
                "name": m,
                "image": path + m + ".svg",
                "image_selected": path + m + "_selected.svg",
                "image_menu": path + m + "_menu.svg",
                "last": False
            }
        }
    objects.update(temp)

with open("../public/js/modules.json", "w") as out:
    json.dump(objects, out, indent=2)
