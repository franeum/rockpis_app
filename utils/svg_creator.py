#!/usr/bin/env python3

import yaml
import argparse
import xml.etree.ElementTree as et
from pathlib import Path

parser = argparse.ArgumentParser(description='Takes modules.')
parser.add_argument('filename', type=str, help='name of yaml file')

args = parser.parse_args()

with open(args.filename) as f:
    data = yaml.load(f, Loader=yaml.FullLoader)
    stringhe = data['modules']

p = Path('../public/images/svg/modules')
p.mkdir(parents=True, exist_ok=True)

tree = et.parse('template.svg')

for x in tree.iter():
    if x.text == 'TEMPLATE':
        title = x
    if x.attrib.get('id') == 'cerchio':
        cerchio = x
        
for text in stringhe:        
  title.text = text.upper()
  title.attrib['x'] = '50%'
  title.attrib['y'] = '51%'
  title.attrib['dominant-baseline'] = 'middle'
  title.attrib['text-anchor'] = 'middle'
  cerchio.attrib['fill'] = 'rgb(255,128,0)' 
  tree.write(p / (text.lower() + '.svg'))
  cerchio.attrib['fill'] = 'rgb(255,32,0)'
  tree.write(p / (text.lower() + '_selected.svg'))
    
print('done')
