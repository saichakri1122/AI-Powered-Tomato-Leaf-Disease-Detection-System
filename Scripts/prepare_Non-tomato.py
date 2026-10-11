from pathlib import Path
import shutil
import csv

# ============================================================
# PATHS
# ============================================================

PLANTVILLAGE_PATH = Path(
    r"C:\My_Datasets\archive (6)\plantvillage dataset\color"
)

MASTER_DATASET_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\datasets\master_dataset"
)

OUTPUT_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\datasets\stage1_tomato_detection"
)

# ============================================================
# IMAGE EXTENSIONS
# ============================================================

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
}

# ============================================================
# PLANTVILLAGE NON-TOMATO CLASSES
# ============================================================

NON_TOMATO_KEYWORDS = [
    "Potato",
    "Corn_(maize)",
    "Grape"
]

# ============================================================
# CREATE OUTPUT FOLDERS
# ============================================================

TOMATO_OUTPUT = OUTPUT_PATH / "Tomato"
NON_TOMATO_OUTPUT = OUTPUT_PATH / "Non_Tomato"

TOMATO_OUTPUT.mkdir(parents=True, exist_ok=True)
NON_TOMATO_OUTPUT.mkdir(parents=True, exist_ok=True)

# ============================================================
# METADATA
# ============================================================

metadata = []

tomato_count = 0
non_tomato_count = 0


# ============================================================
# COPY IMAGE FUNCTION
# ============================================================

def copy_image(
    source_file,
    destination_folder,
    source_dataset,
    original_class,
    final_class
):

    if source_file.suffix.lower() not in IMAGE_EXTENSIONS:
        return False

    # Include original class in filename to avoid collisions
    new_filename = (
        f"{source_dataset}_"
        f"{original_class}_"
        f"{source_file.name}"
    )

    destination_file = destination_folder / new_filename

    counter = 1

    while destination_file.exists():

        new_filename = (
            f"{source_dataset}_"
            f"{original_class}_"
            f"{counter}_"
            f"{source_file.name}"
        )

        destination_file = destination_folder / new_filename

        counter += 1

    shutil.copy2(source_file, destination_file)

    metadata.append({
        "new_filename": new_filename,
        "source_dataset": source_dataset,
        "original_class": original_class,
        "final_class": final_class,
        "original_path": str(source_file)
    })

    return True


# ============================================================
# 1. COPY TOMATO IMAGES
# ============================================================

print("\n========================================")
print("COPYING TOMATO IMAGES")
print("========================================")

for class_folder in sorted(MASTER_DATASET_PATH.iterdir()):

    if not class_folder.is_dir():
        continue

    # Ignore files such as metadata.csv
    if class_folder.name not in [
        "Healthy",
        "Bacterial_Spot",
        "Early_Blight",
        "Late_Blight",
        "Leaf_Mold",
        "Septoria_Leaf_Spot",
        "Spider_Mites",
        "Target_Spot",
        "Yellow_Leaf_Curl_Virus",
        "Tomato_Mosaic_Virus"
    ]:
        continue

    images = [
        file
        for file in class_folder.iterdir()
        if file.is_file()
        and file.suffix.lower() in IMAGE_EXTENSIONS
    ]

    print(
        f"{class_folder.name}: "
        f"{len(images)} images"
    )

    for image_file in images:

        copied = copy_image(
            source_file=image_file,
            destination_folder=TOMATO_OUTPUT,
            source_dataset="Tomato_Master_Dataset",
            original_class=class_folder.name,
            final_class="Tomato"
        )

        if copied:
            tomato_count += 1


# ============================================================
# 2. COPY NON-TOMATO IMAGES
# ============================================================

print("\n========================================")
print("COPYING NON-TOMATO IMAGES")
print("========================================")

for class_folder in sorted(PLANTVILLAGE_PATH.iterdir()):

    if not class_folder.is_dir():
        continue

    # Check whether this folder belongs to
    # Potato, Corn or Grape
    matched = False

    for keyword in NON_TOMATO_KEYWORDS:

        if keyword.lower() in class_folder.name.lower():
            matched = True
            break

    if not matched:
        continue

    images = [
        file
        for file in class_folder.rglob("*")
        if file.is_file()
        and file.suffix.lower() in IMAGE_EXTENSIONS
    ]

    print(
        f"{class_folder.name}: "
        f"{len(images)} images"
    )

    for image_file in images:

        copied = copy_image(
            source_file=image_file,
            destination_folder=NON_TOMATO_OUTPUT,
            source_dataset="PlantVillage",
            original_class=class_folder.name,
            final_class="Non_Tomato"
        )

        if copied:
            non_tomato_count += 1


# ============================================================
# 3. SAVE METADATA
# ============================================================

metadata_file = OUTPUT_PATH / "metadata.csv"

with open(
    metadata_file,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    fieldnames = [
        "new_filename",
        "source_dataset",
        "original_class",
        "final_class",
        "original_path"
    ]

    writer = csv.DictWriter(
        file,
        fieldnames=fieldnames
    )

    writer.writeheader()
    writer.writerows(metadata)


# ============================================================
# 4. FINAL REPORT
# ============================================================

print("\n========================================")
print("STAGE 1 DATASET PREPARATION COMPLETE")
print("========================================")

print(f"Tomato images     : {tomato_count}")
print(f"Non-Tomato images : {non_tomato_count}")
print(f"Total images      : {tomato_count + non_tomato_count}")

print("\nOutput:")
print(OUTPUT_PATH)

print("\nMetadata:")
print(metadata_file)

print("\nOriginal datasets were NOT modified.")

print("========================================")