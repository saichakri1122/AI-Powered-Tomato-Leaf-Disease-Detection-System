from pathlib import Path
import shutil
import csv

# ============================================================
# 1. PATHS
# ============================================================

PLANTVILLAGE_PATH = Path(
    r"C:\My_Datasets\archive (6)\plantvillage dataset\color"
)

PLANTDOC_PATH = Path(
    r"C:\My_Datasets\archive (7)"
)

OUTPUT_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\datasets\master_dataset"
)

# ============================================================
# 2. FINAL STANDARDIZED CLASSES
# ============================================================

FINAL_CLASSES = [
    "Healthy",
    "Bacterial_Spot",
    "Early_Blight",
    "Late_Blight",
    "Leaf_Mold",
    "Septoria_Leaf_Spot",
    "Spider_Mites",
    "Target_Spot",
    "Yellow_Leaf_Curl_Virus",
    "Tomato_Mosaic_Virus",
]

# ============================================================
# 3. PLANTVILLAGE MAPPING
# ============================================================

PLANTVILLAGE_MAPPING = {
    "Tomato___healthy": "Healthy",
    "Tomato___Bacterial_spot": "Bacterial_Spot",
    "Tomato___Early_blight": "Early_Blight",
    "Tomato___Late_blight": "Late_Blight",
    "Tomato___Leaf_Mold": "Leaf_Mold",
    "Tomato___Septoria_leaf_spot": "Septoria_Leaf_Spot",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Spider_Mites",
    "Tomato___Target_Spot": "Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus": "Tomato_Mosaic_Virus",
}

# ============================================================
# 4. PLANTDOC MAPPING
# ============================================================

PLANTDOC_MAPPING = {
    "Tomato_leaf": "Healthy",
    "Tomato_leaf_bacterial_spot": "Bacterial_Spot",
    "Tomato_Early_blight_leaf": "Early_Blight",
    "Tomato_leaf_late_blight": "Late_Blight",
    "Tomato_mold_leaf": "Leaf_Mold",
    "Tomato_Septoria_leaf_spot": "Septoria_Leaf_Spot",
    "Tomato_two_spotted_spider_mites_leaf": "Spider_Mites",
    "Tomato_leaf_yellow_virus": "Yellow_Leaf_Curl_Virus",
    "Tomato_leaf_mosaic_virus": "Tomato_Mosaic_Virus",
}

# ============================================================
# 5. IMAGE EXTENSIONS
# ============================================================

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
}

# ============================================================
# 6. PREPARE OUTPUT DIRECTORIES
# ============================================================

OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

for class_name in FINAL_CLASSES:
    (OUTPUT_PATH / class_name).mkdir(parents=True, exist_ok=True)

# ============================================================
# 7. METADATA
# ============================================================

metadata = []

class_counts = {
    class_name: 0
    for class_name in FINAL_CLASSES
}


# ============================================================
# 8. COPY FUNCTION
# ============================================================

def copy_image(
    source_file,
    source_dataset,
    source_split,
    original_class,
    final_class
):
    """
    Copy one image into the master dataset and
    record its metadata.
    """

    if source_file.suffix.lower() not in IMAGE_EXTENSIONS:
        return

    destination_folder = OUTPUT_PATH / final_class

    # Add source information to filename
    new_filename = (
        f"{source_dataset}_"
        f"{source_split}_"
        f"{source_file.name}"
    )

    destination_file = destination_folder / new_filename

    # Avoid accidental overwrite
    counter = 1

    while destination_file.exists():
        new_filename = (
            f"{source_dataset}_"
            f"{source_split}_"
            f"{counter}_"
            f"{source_file.name}"
        )

        destination_file = destination_folder / new_filename

        counter += 1

    shutil.copy2(source_file, destination_file)

    metadata.append({
        "new_filename": new_filename,
        "source_dataset": source_dataset,
        "source_split": source_split,
        "original_class": original_class,
        "final_class": final_class,
        "original_path": str(source_file),
    })

    class_counts[final_class] += 1


# ============================================================
# 9. PROCESS PLANTVILLAGE
# ============================================================

print("\n========================================")
print("PROCESSING PLANTVILLAGE")
print("========================================")

plantvillage_total = 0

for original_class, final_class in PLANTVILLAGE_MAPPING.items():

    class_folder = PLANTVILLAGE_PATH / original_class

    if not class_folder.exists():
        print(f"[WARNING] Missing: {original_class}")
        continue

    images = [
        file for file in class_folder.iterdir()
        if file.is_file()
        and file.suffix.lower() in IMAGE_EXTENSIONS
    ]

    print(
        f"{original_class} -> "
        f"{final_class}: {len(images)} images"
    )

    for image_file in images:

        copy_image(
            source_file=image_file,
            source_dataset="PlantVillage",
            source_split="original",
            original_class=original_class,
            final_class=final_class
        )

        plantvillage_total += 1


# ============================================================
# 10. PROCESS PLANTDOC
# ============================================================

print("\n========================================")
print("PROCESSING PLANTDOC")
print("========================================")

plantdoc_total = 0

for split in ["train", "test"]:

    split_path = PLANTDOC_PATH / split

    if not split_path.exists():
        print(f"[WARNING] Missing split: {split}")
        continue

    print(f"\nProcessing PlantDoc {split}...")

    for original_class, final_class in PLANTDOC_MAPPING.items():

        class_folder = split_path / original_class

        if not class_folder.exists():
            print(
                f"[WARNING] Missing: "
                f"{split}/{original_class}"
            )
            continue

        images = [
            file for file in class_folder.iterdir()
            if file.is_file()
            and file.suffix.lower() in IMAGE_EXTENSIONS
        ]

        print(
            f"{original_class} -> "
            f"{final_class}: {len(images)} images"
        )

        for image_file in images:

            copy_image(
                source_file=image_file,
                source_dataset="PlantDoc",
                source_split=split,
                original_class=original_class,
                final_class=final_class
            )

            plantdoc_total += 1


# ============================================================
# 11. SAVE METADATA CSV
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
        "source_split",
        "original_class",
        "final_class",
        "original_path",
    ]

    writer = csv.DictWriter(
        file,
        fieldnames=fieldnames
    )

    writer.writeheader()
    writer.writerows(metadata)


# ============================================================
# 12. FINAL REPORT
# ============================================================

print("\n========================================")
print("DATASET PREPARATION COMPLETE")
print("========================================")

print(f"\nPlantVillage images copied: {plantvillage_total}")
print(f"PlantDoc images copied:     {plantdoc_total}")
print(f"Total images:               {len(metadata)}")

print("\nFinal class distribution:")
print("----------------------------------------")

for class_name in FINAL_CLASSES:
    print(
        f"{class_name:25s} : "
        f"{class_counts[class_name]}"
    )

print("\nMaster dataset location:")
print(OUTPUT_PATH)

print("\nMetadata file:")
print(metadata_file)

print("\nOriginal datasets were NOT modified.")
print("========================================")