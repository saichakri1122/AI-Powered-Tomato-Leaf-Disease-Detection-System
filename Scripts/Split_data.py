from pathlib import Path
import shutil
import random
import csv

# ============================================================
# PATHS
# ============================================================

BASE_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\datasets"
)

STAGE1_SOURCE = BASE_PATH / "stage1_tomato_detection"
MASTER_SOURCE = BASE_PATH / "master_dataset"

STAGE1_OUTPUT = BASE_PATH / "stage1_split"
STAGE2_OUTPUT = BASE_PATH / "stage2_split"

# ============================================================
# SETTINGS
# ============================================================

RANDOM_SEED = 42

random.seed(RANDOM_SEED)

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
}

STAGE2_CLASSES = [
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
]

# ============================================================
# HELPER FUNCTION
# ============================================================

def get_images(folder):
    return [
        file
        for file in folder.iterdir()
        if file.is_file()
        and file.suffix.lower() in IMAGE_EXTENSIONS
    ]


def copy_files(files, destination):
    destination.mkdir(parents=True, exist_ok=True)

    for file in files:
        shutil.copy2(file, destination / file.name)


# ============================================================
# STAGE 1
# TOMATO VS NON-TOMATO
# ============================================================

print("\n========================================")
print("STAGE 1 SPLIT")
print("========================================")

stage1_metadata = []

stage1_train_count = 0
stage1_val_count = 0
stage1_test_count = 0

for class_name in ["Tomato", "Non_Tomato"]:

    source_folder = STAGE1_SOURCE / class_name

    images = get_images(source_folder)

    random.shuffle(images)

    total = len(images)

    train_end = int(total * 0.80)
    val_end = int(total * 0.90)

    train_files = images[:train_end]
    val_files = images[train_end:val_end]
    test_files = images[val_end:]

    # Create folders
    train_folder = STAGE1_OUTPUT / "train" / class_name
    val_folder = STAGE1_OUTPUT / "val" / class_name
    test_folder = STAGE1_OUTPUT / "test" / class_name

    copy_files(train_files, train_folder)
    copy_files(val_files, val_folder)
    copy_files(test_files, test_folder)

    stage1_train_count += len(train_files)
    stage1_val_count += len(val_files)
    stage1_test_count += len(test_files)

    print(f"\n{class_name}")
    print(f"Total : {total}")
    print(f"Train : {len(train_files)}")
    print(f"Val   : {len(val_files)}")
    print(f"Test  : {len(test_files)}")

    for file in train_files:
        stage1_metadata.append({
            "filename": file.name,
            "class": class_name,
            "split": "train"
        })

    for file in val_files:
        stage1_metadata.append({
            "filename": file.name,
            "class": class_name,
            "split": "val"
        })

    for file in test_files:
        stage1_metadata.append({
            "filename": file.name,
            "class": class_name,
            "split": "test"
        })


# Save Stage 1 metadata

stage1_metadata_file = STAGE1_OUTPUT / "metadata.csv"

with open(
    stage1_metadata_file,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=["filename", "class", "split"]
    )

    writer.writeheader()
    writer.writerows(stage1_metadata)


print("\nStage 1 totals:")
print(f"Train : {stage1_train_count}")
print(f"Val   : {stage1_val_count}")
print(f"Test  : {stage1_test_count}")
print(
    f"Total : "
    f"{stage1_train_count + stage1_val_count + stage1_test_count}"
)


# ============================================================
# STAGE 2
# 10-CLASS TOMATO DISEASE CLASSIFICATION
# ============================================================

print("\n========================================")
print("STAGE 2 SPLIT")
print("========================================")

# Read master metadata

metadata_file = MASTER_SOURCE / "metadata.csv"

with open(
    metadata_file,
    "r",
    encoding="utf-8"
) as file:

    reader = csv.DictReader(file)
    metadata = list(reader)


# ------------------------------------------------------------
# Separate PlantDoc test images
# These become our external test set.
# ------------------------------------------------------------

external_test = []

internal_pool = []

for row in metadata:

    if (
        row["source_dataset"] == "PlantDoc"
        and row["source_split"] == "test"
    ):
        external_test.append(row)
    else:
        internal_pool.append(row)


print(f"\nInternal pool    : {len(internal_pool)}")
print(f"PlantDoc external: {len(external_test)}")


# ------------------------------------------------------------
# Group internal pool by class
# ------------------------------------------------------------

class_groups = {
    class_name: []
    for class_name in STAGE2_CLASSES
}

for row in internal_pool:

    class_name = row["final_class"]

    if class_name in class_groups:
        class_groups[class_name].append(row)


stage2_metadata = []

stage2_train_count = 0
stage2_val_count = 0
stage2_test_count = 0


# ------------------------------------------------------------
# Split each class
# 80% Train
# 10% Validation
# 10% Internal Test
# ------------------------------------------------------------

for class_name in STAGE2_CLASSES:

    rows = class_groups[class_name]

    random.shuffle(rows)

    total = len(rows)

    train_end = int(total * 0.80)
    val_end = int(total * 0.90)

    train_rows = rows[:train_end]
    val_rows = rows[train_end:val_end]
    test_rows = rows[val_end:]

    print(f"\n{class_name}")
    print(f"Total : {total}")
    print(f"Train : {len(train_rows)}")
    print(f"Val   : {len(val_rows)}")
    print(f"Test  : {len(test_rows)}")

    # --------------------------------------------------------
    # Copy files
    # --------------------------------------------------------

    for row in train_rows:

        source = Path(row["original_path"])

        # Use the already-created master image
        source = MASTER_SOURCE / class_name / row["new_filename"]

        destination = (
            STAGE2_OUTPUT
            / "train"
            / class_name
        )

        destination.mkdir(
            parents=True,
            exist_ok=True
        )

        shutil.copy2(
            source,
            destination / source.name
        )

        stage2_metadata.append({
            "filename": source.name,
            "class": class_name,
            "split": "train",
            "source_dataset": row["source_dataset"],
            "source_split": row["source_split"]
        })

    for row in val_rows:

        source = (
            MASTER_SOURCE
            / class_name
            / row["new_filename"]
        )

        destination = (
            STAGE2_OUTPUT
            / "val"
            / class_name
        )

        destination.mkdir(
            parents=True,
            exist_ok=True
        )

        shutil.copy2(
            source,
            destination / source.name
        )

        stage2_metadata.append({
            "filename": source.name,
            "class": class_name,
            "split": "val",
            "source_dataset": row["source_dataset"],
            "source_split": row["source_split"]
        })

    for row in test_rows:

        source = (
            MASTER_SOURCE
            / class_name
            / row["new_filename"]
        )

        destination = (
            STAGE2_OUTPUT
            / "test"
            / class_name
        )

        destination.mkdir(
            parents=True,
            exist_ok=True
        )

        shutil.copy2(
            source,
            destination / source.name
        )

        stage2_metadata.append({
            "filename": source.name,
            "class": class_name,
            "split": "test",
            "source_dataset": row["source_dataset"],
            "source_split": row["source_split"]
        })

    stage2_train_count += len(train_rows)
    stage2_val_count += len(val_rows)
    stage2_test_count += len(test_rows)


# ============================================================
# COPY PLANTDOC EXTERNAL TEST
# ============================================================

print("\n========================================")
print("PLANTDOC EXTERNAL TEST SET")
print("========================================")

external_count = 0

for row in external_test:

    class_name = row["final_class"]

    source = (
        MASTER_SOURCE
        / class_name
        / row["new_filename"]
    )

    destination = (
        STAGE2_OUTPUT
        / "plantdoc_external_test"
        / class_name
    )

    destination.mkdir(
        parents=True,
        exist_ok=True
    )

    shutil.copy2(
        source,
        destination / source.name
    )

    external_count += 1

    stage2_metadata.append({
        "filename": source.name,
        "class": class_name,
        "split": "plantdoc_external_test",
        "source_dataset": "PlantDoc",
        "source_split": "test"
    })


# ============================================================
# SAVE STAGE 2 METADATA
# ============================================================

stage2_metadata_file = STAGE2_OUTPUT / "metadata.csv"

with open(
    stage2_metadata_file,
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=[
            "filename",
            "class",
            "split",
            "source_dataset",
            "source_split"
        ]
    )

    writer.writeheader()
    writer.writerows(stage2_metadata)


# ============================================================
# FINAL REPORT
# ============================================================

print("\n========================================")
print("DATASET SPLITTING COMPLETE")
print("========================================")

print("\nSTAGE 1")
print(f"Train : {stage1_train_count}")
print(f"Val   : {stage1_val_count}")
print(f"Test  : {stage1_test_count}")
print(
    f"Total : "
    f"{stage1_train_count + stage1_val_count + stage1_test_count}"
)

print("\nSTAGE 2")
print(f"Train              : {stage2_train_count}")
print(f"Validation         : {stage2_val_count}")
print(f"Internal Test      : {stage2_test_count}")
print(f"PlantDoc External  : {external_count}")

total_stage2 = (
    stage2_train_count
    + stage2_val_count
    + stage2_test_count
    + external_count
)

print(f"Total : {total_stage2}")

print(f"Total : {total_stage2}")
print("\nOutput folders:")
print(STAGE1_OUTPUT)
print(STAGE2_OUTPUT)

print("\nRandom seed:", RANDOM_SEED)

print("\nOriginal datasets were NOT modified.")

print("========================================")