import os
import re

# Specify the directory path
dir_path = "../src"

# Define the regular expression pattern to match the img tag with src attribute
img_regex = r"<img\s+.*?\bsrc=(?::['\"]([^'\"]+\.svg)['\"]|([^'\"]+\.svg))"

# Loop through all the files in the directory
for root, dirs, files in os.walk(dir_path):
    for file_name in files:
        if file_name.endswith(".vue"):
            file_path = os.path.join(root, file_name)

            # Open the file and read the contents
            with open(file_path, "r") as f:
                file_contents = f.read()

            # Use regular expression to find the src attribute value
            matches = re.finditer(img_regex, file_contents)

            for match in matches:
                src_file_name = os.path.splitext(
                    os.path.basename(match.group(1) or match.group(2)))[0]

                # Use regular expression to find and replace the alt attribute value
                new_contents = re.sub(
                    r'<img.*?alt="(.*?)".*?>', f'<img src="{match.group(0)}" :alt="$t(\'alts.{src_file_name}\')"> ', file_contents)

                # Write the new contents back to the file
                with open(file_path, "w") as f:
                    f.write(new_contents)
