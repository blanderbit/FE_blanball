import os
import re

mixin = """@mixin font($color, $size, $weight) {
    font-style: normal;
    color: $color;
    font-size: $size;
    font-weight: $weight;
}

@mixin inter($size, $weight, $color: $--b-main-black-color) {
  font-family: 'Inter';
  @include font($color, $size, $weight);
}"""

def apply_mixin(file_path):
    with open(file_path, 'r+') as f:
        contents = f.read()
        styles = re.findall('<style(.+?)<\/style>', contents, re.DOTALL)
        for style in styles:
            updated_style = style
            updated = False
            selectors = re.findall('([^{]+?)\s*\{([^}]+)\}', style, re.DOTALL)
            for selector in selectors:
                if 'Inter' in selector[1]:
                    font_size = ''
                    font_weight = 'normal'
                    color = '$--b-main-black-color'
                    other_props = ''
                    
                    if 'font-size' in selector[1]:
                        font_size = re.search('font-size\s*:\s*(.*);', selector[1])
                        if font_size:
                            font_size = font_size.group(1)
                        else:
                            continue
                    if 'font-weight' in selector[1]:
                        font_weight = re.search('font-weight\s*:\s*(.*);', selector[1])
                        if font_weight:
                            font_weight = font_weight.group(1)
                        else:
                            continue
                    if 'color' in selector[1]:
                        color = re.search('color\s*:\s*(.*);', selector[1])
                        if color:
                            color = color.group(1)
                        else:
                            continue
                    
                    # Get rid of all other properties except font-family and font-style
                    other_props = re.sub('font-size\s*:\s*(.*);|font-weight\s*:\s*(.*);|color\s*:\s*(.*);', '', selector[1])
                    if not other_props.strip():
                        continue
                        
                    print(other_props.strip())
                    updated_style = updated_style.replace(selector[1], "\n@include inter({}, {}, {}) {{{}}}".format(font_size, font_weight, color, other_props.strip()))
                    updated = True
            if updated:
                contents = contents.replace(style, updated_style)
                print("Updated styles for file:", file_path)
        f.seek(0)
        f.write(contents)
        f.truncate()

def main():
    for subdir, dirs, files in os.walk('../src'):
        for file in files:
            if file.endswith('.vue'):
                apply_mixin(os.path.join(subdir, file))
                
if __name__ == "__main__":
    main()