# pip install dirsync

from dirsync import sync
from_site_path = '../blog_creator/_site/'
target_site_path = '../blog/'

source_path = '../blog_creator'
target_path = '../../Blog-Source-Code'

sync(from_site_path, target_site_path, 'sync')  # for syncing one way
sync(source_path, target_path, 'sync')  # for syncing one way

# sync(target_path, source_path, 'sync')  # for syncing the opposite way
