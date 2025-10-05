#!/bin/bash

# Portfolio Image Resizer Script - From Original High-Resolution to Full HD
# This script resizes original high-resolution images to Full HD (1920x1080) for maximum clarity

echo "🖼️  Portfolio Image Resizer - Original to Full HD"
echo "=================================================="

# Create backup directory for current state
BACKUP_DIR="public/images_backup_before_fhd_$(date +%Y%m%d_%H%M%S)"
echo "📁 Creating backup of current state in: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to resize images from original high-res to Full HD
resize_to_fhd() {
    local dir="$1"
    local max_width="$2"
    local quality="$3"
    
    echo "📂 Processing directory: $dir"
    
    # Find all JPG files
    find "$dir" -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
        # Get file info
        filename=$(basename "$file")
        dirname=$(dirname "$file")
        
        # Create backup of current file
        backup_file="$BACKUP_DIR/${dirname#public/}/$filename"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        
        # Get original dimensions
        original_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        original_width=$(echo "$original_size" | cut -d'x' -f1)
        
        # Resize to Full HD if larger than max_width
        if [ "$original_width" -gt "$max_width" ]; then
            echo "  🔄 Resizing to Full HD: $filename ($original_size -> max width $max_width)"
            
            # Resize image to Full HD with high quality
            sips -Z "$max_width" --setProperty formatOptions "$quality" "$file" > /dev/null 2>&1
            
            # Get new dimensions
            new_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
            echo "  ✅ Resized to Full HD: $filename ($original_size -> $new_size)"
        else
            echo "  ⏭️  Skipping: $filename (already $original_size, smaller than $max_width)"
        fi
    done
}

# Resize images from original high-resolution to Full HD
echo ""
echo "🎯 Resizing original high-resolution images to Full HD..."

# Gallery images (Full HD from original high-res, maximum quality)
echo ""
echo "📸 Gallery Images (Full HD: 1920px from original high-res, quality: 95%)"
resize_to_fhd "public/branding" 1920 95
resize_to_fhd "public/logo" 1920 95
resize_to_fhd "public/packaging" 1920 95
resize_to_fhd "public/social-media" 1920 95

# Create high-quality thumbnails from the Full HD images
echo ""
echo "🖼️  Creating high-quality thumbnail versions (max width: 800px, quality: 90%)"
THUMBNAIL_DIR="public/thumbnails"
mkdir -p "$THUMBNAIL_DIR"

# Function to create high-quality thumbnails from Full HD images
create_thumbnails() {
    local source_dir="$1"
    local category=$(basename "$source_dir")
    
    echo "📂 Creating high-quality thumbnails for: $category"
    mkdir -p "$THUMBNAIL_DIR/$category"
    
    find "$source_dir" -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
        filename=$(basename "$file")
        thumbnail_file="$THUMBNAIL_DIR/$category/$filename"
        
        # Create high-quality thumbnail from Full HD image
        sips -Z 800 --setProperty formatOptions 90 "$file" --out "$thumbnail_file" > /dev/null 2>&1
        
        echo "  📷 Created high-quality thumbnail: $filename"
    done
}

create_thumbnails "public/branding"
create_thumbnails "public/logo" 
create_thumbnails "public/packaging"
create_thumbnails "public/social-media"

# Calculate space usage
echo ""
echo "📊 Full HD Processing Report (From Original High-Res)"
echo "====================================================="

# Calculate backup size
backup_size=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "📁 Backup size (before Full HD): $backup_size"

# Calculate new size
new_size=$(du -sh public | cut -f1)
echo "📁 New Full HD images size: $new_size"

echo ""
echo "✅ Full HD processing from original high-resolution complete!"
echo "📁 Backup of current state: $BACKUP_DIR"
echo "🖼️  High-quality thumbnails created in: $THUMBNAIL_DIR"
echo ""
echo "💡 Full HD improvements from original:"
echo "   📸 Gallery images: 1920px from original high-res (6667px+ -> 1920px)"
echo "   🖼️  Thumbnails: 800px (high quality)"
echo "   🎨 Quality: 95% (maximum quality from original)"
echo "   📈 Source: Original high-resolution images (not upscaled)"
echo ""
echo "💡 Quality improvements:"
echo "   ✅ Downsampled from original high-res (6667x4167px) to Full HD"
echo "   ✅ Maximum quality preservation (95%)"
echo "   ✅ No upscaling artifacts"
echo "   ✅ Crystal clear Full HD resolution"
echo ""
echo "💡 Next steps:"
echo "   1. Test the Full HD quality - should be much sharper now!"
echo "   2. If satisfied, you can delete the backup folder"
echo "   3. Your images are now properly optimized from original source"
