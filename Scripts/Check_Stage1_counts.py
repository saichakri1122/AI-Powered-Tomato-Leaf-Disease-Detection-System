from pathlib import Path

DATASET_PATH = Path(
    r"C:\FINAL PROJECT\TomatoDiseaseProject\Datasets\stage1_split"
)

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
}

print("\n========================================")
print("STAGE 1 COUNT VERIFICATION")
print("========================================")

grand_total = 0

for split in ["train", "val", "test"]:

    print(f"\n{split.upper()}")

    split_total = 0

    for class_name in ["Tomato", "Non_Tomato"]:

        folder = DATASET_PATH / split / class_name

        files = [
            f for f in folder.iterdir()
            if f.is_file()
            and f.suffix.lower() in IMAGE_EXTENSIONS
        ]

        count = len(files)

        print(f"{class_name:12s}: {count}")

        split_total += count

    print(f"Split total  : {split_total}")

    grand_total += split_total

print("\n----------------------------------------")
print(f"GRAND TOTAL   : {grand_total}")
print("----------------------------------------")

print("\nExpected:")
print("Tomato       : 19063")
print("Non_Tomato   : 10066")
print("Grand Total  : 29129")

print("========================================")