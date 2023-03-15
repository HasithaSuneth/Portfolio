# pip install dirsync

from dirsync import sync
source_path = '../blog_creator/_site/'
target_path = '../blog/'

sync(source_path, target_path, 'sync')  # for syncing one way
# sync(target_path, source_path, 'sync')  # for syncing the opposite way
