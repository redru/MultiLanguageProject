import sys
import time

while True:
    cmd = sys.stdin.readline()
    print(cmd + time.strftime("%d/%m/%Y %H:%M:%S"))
    sys.stdout.flush()