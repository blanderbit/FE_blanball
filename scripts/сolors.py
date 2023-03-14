import os
import re

# Specify the directory you want to search
directory = '../src'

scss_var_pattern = re.compile(r'(\$color-[a-z0-9]+):\s*\$color-([a-z0-9]+);')

# Define the regular expression to match hex colors
hex_color_regex = r'(?<!\$)#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?!\w)'

# Iterate over all .vue files in the directory and its subfolders
for subdir, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.vue'):
            file_path = os.path.join(subdir, file)
            with open(file_path, 'r+') as f:
                content = f.read()
                style_match = re.search(r'<style[^>]*>(.*?)<\/style>', content, re.DOTALL)
                if style_match:
                    style_content = style_match.group(1)
                    hex_colors = re.findall(hex_color_regex, style_content)
                    if hex_colors:
                        # Keep track of the colors for which we have already defined variables
                        defined_colors = set()

                        # Create a dictionary that maps hex colors to their corresponding SCSS variables
                        color_var_map = {}
                        new_style_content = ''
                        for color in hex_colors:
                            color = color.lower()  # convert to lowercase
                            variable_name = f'$color-{color}'
                            if variable_name not in defined_colors:
                                # Check if the variable is already defined in the style content
                                if f'{variable_name}:' not in style_content:
                                    new_style_content += f'\n{variable_name}: #{color};'
                                defined_colors.add(variable_name)
                            color_var_map[color] = variable_name

                        new_style_content += style_content

                        # Replace all occurrences of each hex color in the style content with its corresponding SCSS variable
                        for color, var_name in color_var_map.items():
                            new_style_content = new_style_content.replace(f'#{color}', var_name)

                        # Replace the original style content with the new content
                        f.seek(0)
                        f.write(content.replace(style_content, new_style_content))
                        f.truncate()

            with open(file_path, 'r+') as f:
                content = f.read()
                new_content = scss_var_pattern.sub(r'\1: #\2;', content)
                f.seek(0)
                f.write(new_content)
                f.truncate()