import sys
import time

cmd = sys.stdin.readline()
print(cmd + time.strftime("%d/%m/%Y %H:%M:%S"))
sys.stdout.flush()