from pathlib import Path
from PIL import Image
import hashlib
import csv

# ============================================================
# PATH
# ============================================================

DATASET_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\datasets\master_dataset"
)

REPORT_PATH = DATASET_PATH / "quality_report.csv"
DUPLICATE_REPORT = DATASET_PATH / "duplicate_report.csv"

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
}

# ============================================================
# STORAGE
# ============================================================

file_hashes = {}
quality_results = []

total_images = 0
valid_images = 0
corrupted_images = 0
small_images = 0
duplicate_images = 0

# ============================================================
# HASH FUNCTION
# ============================================================

def calculate_hash(file_path):

    hash_object = hashlib.md5()

    with open(file_path, "rb") as file:

        for chunk in iter(lambda: file.read(8192), b""):
            hash_object.update(chunk)

    return hash_object.hexdigest()


# ============================================================
# SCAN DATASET
# ============================================================

print("\n========================================")
print("DATASET QUALITY CHECK")
print("========================================")

for class_folder in sorted(DATASET_PATH.iterdir()):

    if not class_folder.is_dir():
        continue

    class_name = class_folder.name

    print(f"\nChecking: {class_name}")

    for image_file in class_folder.iterdir():

        if not image_file.is_file():
            continue

        if image_file.suffix.lower() not in IMAGE_EXTENSIONS:
            continue

        total_images += 1

        try:

            # ------------------------------------------------
            # Open image
            # ------------------------------------------------

            with Image.open(image_file) as image:

                image.verify()

            # Open again because verify() closes image state
            with Image.open(image_file) as image:

                width, height = image.size
                image_format = image.format

            valid_images += 1

            # ------------------------------------------------
            # Small image check
            # ------------------------------------------------

            is_small = width < 100 or height < 100

            if is_small:
                small_images += 1

            # ------------------------------------------------
            # Exact duplicate check
            # ------------------------------------------------

            image_hash = calculate_hash(image_file)

            if image_hash in file_hashes:

                duplicate_images += 1

                duplicate_of = file_hashes[image_hash]

                quality_results.append({
                    "filename": image_file.name,
                    "class": class_name,
                    "status": "DUPLICATE",
                    "width": width,
                    "height": height,
                    "format": image_format,
                    "hash": image_hash,
                    "duplicate_of": str(duplicate_of)
                })

            else:

                file_hashes[image_hash] = image_file

                quality_results.append({
                    "filename": image_file.name,
                    "class": class_name,
                    "status": "OK_SMALL" if is_small else "OK",
                    "width": width,
                    "height": height,
                    "format": image_format,
                    "hash": image_hash,
                    "duplicate_of": ""
                })

        except Exception as error:

            corrupted_images += 1

            quality_results.append({
                "filename": image_file.name,
                "class": class_name,
                "status": "CORRUPTED",
                "width": "",
                "height": "",
                "format": "",
                "hash": "",
                "duplicate_of": str(error)
            })


# ============================================================
# SAVE QUALITY REPORT
# ============================================================

with open(
    REPORT_PATH,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    fieldnames = [
        "filename",
        "class",
        "status",
        "width",
        "height",
        "format",
        "hash",
        "duplicate_of"
    ]

    writer = csv.DictWriter(
        file,
        fieldnames=fieldnames
    )

    writer.writeheader()
    writer.writerows(quality_results)


# ============================================================
# SAVE DUPLICATE REPORT
# ============================================================

duplicates = [
    result
    for result in quality_results
    if result["status"] == "DUPLICATE"
]

with open(
    DUPLICATE_REPORT,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    fieldnames = [
        "filename",
        "class",
        "duplicate_of",
        "hash"
    ]

    writer = csv.DictWriter(
        file,
        fieldnames=fieldnames
    )

    writer.writeheader()

    for duplicate in duplicates:

        writer.writerow({
            "filename": duplicate["filename"],
            "class": duplicate["class"],
            "duplicate_of": duplicate["duplicate_of"],
            "hash": duplicate["hash"]
        })


# ============================================================
# FINAL REPORT
# ============================================================

print("\n========================================")
print("QUALITY CHECK COMPLETE")
print("========================================")

print(f"Total images scanned : {total_images}")
print(f"Valid images         : {valid_images}")
print(f"Corrupted images     : {corrupted_images}")
print(f"Small images         : {small_images}")
print(f"Exact duplicates     : {duplicate_images}")

print("\nQuality report:")
print(REPORT_PATH)

print("\nDuplicate report:")
print(DUPLICATE_REPORT)

print("\nIMPORTANT:")
print("No images were deleted or modified.")

print("========================================")