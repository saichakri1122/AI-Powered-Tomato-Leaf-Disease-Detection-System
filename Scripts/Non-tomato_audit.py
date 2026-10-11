from pathlib import Path

PLANTVILLAGE_PATH = Path(
    r"C:\My_Datasets\archive (6)\plantvillage dataset\color"
)

TARGET_WORDS = [
    "Potato",
    "Corn",
    "Grape"
]

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp"
}

print("\n========================================")
print("STAGE 1 NON-TOMATO DATASET AUDIT")
print("========================================")

grand_total = 0

for target in TARGET_WORDS:

    print(f"\n========== {target.upper()} ==========")

    matching_folders = [
        folder
        for folder in PLANTVILLAGE_PATH.iterdir()
        if folder.is_dir()
        and target.lower() in folder.name.lower()
    ]

    if not matching_folders:
        print(f"No folders found for {target}")
        continue

    target_total = 0

    for folder in sorted(matching_folders):

        images = [
            file
            for file in folder.rglob("*")
            if file.is_file()
            and file.suffix.lower() in IMAGE_EXTENSIONS
        ]

        print(f"{folder.name}: {len(images)} images")

        target_total += len(images)

    print(f"Total {target}: {target_total}")

    grand_total += target_total

print("\n----------------------------------------")
print(f"Grand Total: {grand_total}")
print("----------------------------------------")

print("\nAudit complete.")