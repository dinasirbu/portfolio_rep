#!/bin/bash

# Portfolio Image Resizer Script - Full HD Version
# This script resizes all images in the portfolio to Full HD (1920x1080) for maximum clarity

echo "🖼️  Portfolio Image Resizer - Full HD"
echo "====================================="

# Create backup directory
BACKUP_DIR="public/images_backup_$(date +%Y%m%d_%H%M%S)"
echo "📁 Creating backup in: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to resize images
resize_images() {
    local dir="$1"
    local max_width="$2"
    local quality="$3"
    
    echo "📂 Processing directory: $dir"
    
    # Find all JPG files
    find "$dir" -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
        # Get file info
        filename=$(basename "$file")
        dirname=$(dirname "$file")
        
        # Create backup
        backup_file="$BACKUP_DIR/${dirname#public/}/$filename"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        
        # Get original dimensions
        original_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        original_width=$(echo "$original_size" | cut -d'x' -f1)
        
        # Only resize if image is larger than max_width
        if [ "$original_width" -gt "$max_width" ]; then
            echo "  🔄 Resizing: $filename ($original_size -> max width $max_width)"
            
            # Resize image
            sips -Z "$max_width" --setProperty formatOptions "$quality" "$file" > /dev/null 2>&1
            
            # Get new dimensions
            new_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
            echo "  ✅ Resized: $filename ($original_size -> $new_size)"
        else
            echo "  ⏭️  Skipping: $filename (already $original_size, smaller than $max_width)"
        fi
    done
}

# Function to upscale smaller images to Full HD
upscale_images() {
    local dir="$1"
    local target_width="$2"
    local quality="$3"
    
    echo "📂 Upscaling images in: $dir"
    
    # Find all JPG files
    find "$dir" -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
        # Get file info
        filename=$(basename "$file")
        dirname=$(dirname "$file")
        
        # Create backup
        backup_file="$BACKUP_DIR/${dirname#public/}/$filename"
        mkdir -p "$(dirname "$backup_file")"
        cp "$file" "$backup_file"
        
        # Get original dimensions
        original_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        original_width=$(echo "$original_size" | cut -d'x' -f1)
        
        # Upscale if image is smaller than target width
        if [ "$original_width" -lt "$target_width" ]; then
            echo "  📈 Upscaling: $filename ($original_size -> target width $target_width)"
            
            # Upscale image
            sips -Z "$target_width" --setProperty formatOptions "$quality" "$file" > /dev/null 2>&1
            
            # Get new dimensions
            new_size=$(sips -g pixelWidth -g pixelHeight "$file" | grep -E "(pixelWidth|pixelHeight)" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
            echo "  ✅ Upscaled: $filename ($original_size -> $new_size)"
        else
            echo "  ⏭️  Skipping: $filename (already $original_size, larger than $target_width)"
        fi
    done
}

# Resize/upscale images to Full HD
echo ""
echo "🎯 Processing images for Full HD (1920px max width)..."

# Gallery images (Full HD resolution, high quality)
echo ""
echo "📸 Gallery Images (Full HD: 1920px max width, quality: 92%)"
resize_images "public/branding" 1920 92
resize_images "public/logo" 1920 92
resize_images "public/packaging" 1920 92
resize_images "public/social-media" 1920 92

# Upscale smaller images to Full HD
echo ""
echo "📈 Upscaling smaller images to Full HD..."
upscale_images "public/branding" 1920 92
upscale_images "public/logo" 1920 92
upscale_images "public/packaging" 1920 92
upscale_images "public/social-media" 1920 92

# Create optimized versions for thumbnails (larger for better preview)
echo ""
echo "🖼️  Creating high-quality thumbnail versions (max width: 800px, quality: 88%)"
THUMBNAIL_DIR="public/thumbnails"
mkdir -p "$THUMBNAIL_DIR"

# Function to create high-quality thumbnails
create_thumbnails() {
    local source_dir="$1"
    local category=$(basename "$source_dir")
    
    echo "📂 Creating high-quality thumbnails for: $category"
    mkdir -p "$THUMBNAIL_DIR/$category"
    
    find "$source_dir" -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
        filename=$(basename "$file")
        thumbnail_file="$THUMBNAIL_DIR/$category/$filename"
        
        # Create high-quality thumbnail
        sips -Z 800 --setProperty formatOptions 88 "$file" --out "$thumbnail_file" > /dev/null 2>&1
        
        echo "  📷 Created high-quality thumbnail: $filename"
    done
}

create_thumbnails "public/branding"
create_thumbnails "public/logo" 
create_thumbnails "public/packaging"
create_thumbnails "public/social-media"

# Calculate space usage
echo ""
echo "📊 Full HD Processing Report"
echo "============================"

# Calculate original size
original_size=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "📁 Original images size: $original_size"

# Calculate new size
new_size=$(du -sh public | cut -f1)
echo "📁 New Full HD images size: $new_size"

echo ""
echo "✅ Full HD image processing complete!"
echo "📁 Original images backed up to: $BACKUP_DIR"
echo "🖼️  High-quality thumbnails created in: $THUMBNAIL_DIR"
echo ""
echo "💡 Full HD improvements:"
echo "   📸 Gallery images: 1920px max width (Full HD)"
echo "   🖼️  Thumbnails: 800px (high quality)"
echo "   🎨 Quality: 92% (maximum quality)"
echo "   📈 Upscaling: Smaller images upscaled to Full HD"
echo ""
echo "💡 Next steps:"
echo "   1. Test the Full HD quality and performance"
echo "   2. If satisfied, you can delete the backup folder"
echo "   3. Your images are now optimized for maximum clarity"
echo "   4. Consider using lazy loading for better performance"
