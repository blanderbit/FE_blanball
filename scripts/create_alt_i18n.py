from json import dumps
import os

# specify the directory you want to list the files from
directory_path = "../src/assets/img"

# create an empty dictionary to store the file names and values
file_dict = {}

# iterate over the root directory and all its subdirectories recursively and add each file name without the .svg extension as a key with an empty string as the value
for root, dirs, files in os.walk(directory_path):
    for file_name in files:
        if file_name.endswith(".svg"):
            file_key = os.path.splitext(file_name)[0]  # remove the extension from the file name
            subdirectory = os.path.relpath(root, directory_path)  # get the relative path of the subdirectory
            if subdirectory != ".":
                file_key = os.path.join(subdirectory, file_key)  # prepend the subdirectory name to the file key
            file_dict[file_key] = ""

# check if the alts.js file exists
file_path = "../src/i18n/ua/alts.js"
os.makedirs(os.path.dirname(file_path), exist_ok=True)  # create parent directories if they don't exist
with open(file_path, "w") as js_file:
    js_file.write("export default ")
    js_file.write(dumps(file_dict, indent=4))
    js_file.write(";")