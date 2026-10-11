from pathlib import Path
from collections import Counter

# ============================================================
# DATASET PATHS
# ============================================================

PLANTVILLAGE_PATH = Path(
    r"C:\My_Datasets\archive (6)\plantvillage dataset\color"
)

PLANTDOC_PATH = Path(
    r"C:\My_Datasets\archive (7)"
)

# ============================================================
# SUPPORTED IMAGE EXTENSIONS
# ============================================================

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".JPG",
    ".JPEG",
    ".PNG"
}


# ============================================================
# GET ALL IMAGES
# ============================================================

def get_images(folder):
    """Find all image files inside a folder and its subfolders."""
    
    return [
        file
        for file in folder.rglob("*")
        if file.is_file() and file.suffix in IMAGE_EXTENSIONS
    ]


# ============================================================
# PLANTVILLAGE AUDIT
# ============================================================

def audit_plantvillage():

    print("\n" + "=" * 80)
    print("PLANTVILLAGE DATASET")
    print("=" * 80)

    if not PLANTVILLAGE_PATH.exists():
        print("\n❌ ERROR: PlantVillage path does not exist:")
        print(PLANTVILLAGE_PATH)
        return

    class_counts = Counter()

    # Each folder represents a class
    for class_folder in PLANTVILLAGE_PATH.iterdir():

        if class_folder.is_dir():

            images = get_images(class_folder)

            class_counts[class_folder.name] = len(images)

    total_images = sum(class_counts.values())

    print(f"\nDataset path:")
    print(PLANTVILLAGE_PATH)

    print(f"\nTotal images: {total_images}")
    print(f"Total classes: {len(class_counts)}")

    print("\nClass-wise image count:")
    print("-" * 80)

    for class_name, count in sorted(class_counts.items()):

        print(f"{class_name:<65} {count:>6}")


# ============================================================
# PLANTDOC AUDIT
# ============================================================

def audit_plantdoc():

    print("\n" + "=" * 80)
    print("PLANTDOC DATASET")
    print("=" * 80)

    if not PLANTDOC_PATH.exists():
        print("\n❌ ERROR: PlantDoc path does not exist:")
        print(PLANTDOC_PATH)
        return

    print(f"\nDataset path:")
    print(PLANTDOC_PATH)

    # PlantDoc contains train and test
    for split in ["train", "test"]:

        split_path = PLANTDOC_PATH / split

        print("\n" + "-" * 80)
        print(f"{split.upper()} DATA")
        print("-" * 80)

        if not split_path.exists():

            print(f"❌ {split} folder not found.")

            continue

        images = get_images(split_path)

        print(f"Total images: {len(images)}")

        class_counts = Counter()

        # Count images according to their class folder
        for image in images:

            class_name = image.parent.name

            class_counts[class_name] += 1

        print(f"Total classes: {len(class_counts)}")

        print("\nClass-wise image count:")

        for class_name, count in sorted(class_counts.items()):

            print(f"{class_name:<65} {count:>6}")


# ============================================================
# MAIN PROGRAM
# ============================================================

if __name__ == "__main__":

    print("\n")
    print("🍅 TOMATO LEAF DISEASE DETECTION SYSTEM")
    print("Dataset Audit")
    print("=" * 80)

    # Audit PlantVillage
    audit_plantvillage()

    # Audit PlantDoc
    audit_plantdoc()

    print("\n" + "=" * 80)
    print("✅ DATASET AUDIT COMPLETED")
    print("=" * 80)

    print("\nIMPORTANT:")
    print("• No files were modified.")
    print("• No files were moved.")
    print("• No files were renamed.")
    print("• No files were deleted.")