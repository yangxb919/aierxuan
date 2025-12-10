from PIL import Image
import os
import shutil

# Define source and destination
source_dir = "/Users/yangxiaobo/Desktop/AIERXUAN/nanobanana-output"
dest_dir = "/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/public/images/certificates"

# Ensure destination exists
os.makedirs(dest_dir, exist_ok=True)

# Mapping of source filename patterns to destination filenames
# Since exact filenames might be truncated, I'll match by start string
mappings = [
    ("professional_ce_certificate_of_c", "ce-certificate.webp"),
    ("professional_fcc_declaration_of_", "fcc-certificate.webp"),
    ("professional_iso_9001_quality_ma", "iso-9001.webp"),
    ("professional_rohs_compliance_cer", "rohs-certificate.webp")
]

# Find and convert
files = os.listdir(source_dir)
for f in files:
    for pattern, dest_name in mappings:
        if f.startswith(pattern):
            src_path = os.path.join(source_dir, f)
            dest_path = os.path.join(dest_dir, dest_name)
            
            print(f"Converting {src_path} to {dest_path}...")
            try:
                with Image.open(src_path) as img:
                    img.save(dest_path, "WEBP", quality=90)
                print(f"Success: {dest_path}")
            except Exception as e:
                print(f"Error converting {src_path}: {e}")

print("Certificate processing complete.")
