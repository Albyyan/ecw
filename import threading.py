import threading
import math
import os  # Import os to use os.cpu_count()

def stress_test():
    """Perform a CPU-intensive computation."""
    while True:
        _ = math.sqrt(123456) ** 2  # Arbitrary computation to keep the CPU busy.

# Determine the number of threads to use (e.g., your CPU core count).
num_threads = os.cpu_count()  # Correctly use os.cpu_count()

print(f"Starting stress test with {num_threads} threads. Press Ctrl+C to stop.")

threads = []
for _ in range(num_threads):
    t = threading.Thread(target=stress_test)
    t.daemon = True  # Allow threads to exit when the program ends.
    threads.append(t)
    t.start()

# Keep the main thread alive.
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Stress test stopped.")
