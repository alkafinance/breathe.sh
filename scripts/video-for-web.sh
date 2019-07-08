#!/usr/bin/env bash

# Use the Unofficial Bash Strict Mode
# @see http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail

# Generates a cover image along with mute web-ready MP4 and WebM files for a master video
# @see https://gist.github.com/jaydenseric/220c785d6289bcfd7366,
#      https://evilmartians.com/chronicles/better-web-video-with-av1-codec,
#      https://dev.to/benjaminblack/use-ffmpeg-to-compress-and-convert-videos-458l

# Example: bash scripts/video-for-web.sh assets/black-sand.master.mp4 -to '00:00:24'

warn() {
  echo "$*" >&2
}

die() {
  warn "$*"
  exit 1
}

usage() {
  die "Usage: sh $0 <master_video_path> [opts...]"
}

# Normalize current directory
cd "${BASH_SOURCE%/*}" || exit

# Parse arguments
unnormalized_master_video_path="$1"
shift 1
[[ -z "${unnormalized_master_video_path:-}" ]] && usage

master_video_path="$(cd ..; echo "$(pwd)/${unnormalized_master_video_path}")"
master_video_dir=$(dirname "$master_video_path")
master_video_filename=$(basename "$master_video_path")
master_video_name="${master_video_filename%%.*}"

# Generate cover image
ffmpeg -i "$master_video_path" \
  -vframes 1 \
  -q:v 1 \
  "$@" "${master_video_dir}/${master_video_name}.jpg"
# Generate MP4 with H.264
@see https://trac.ffmpeg.org/wiki/Encode/H.264
ffmpeg -i "$master_video_path" \
  -map_metadata -1 \
  -c:v libx264 -crf 28 \
  -preset veryslow \
  -profile:v main \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$@" "${master_video_dir}/${master_video_name}.h264.mp4"
# Generate MP4 with HEVC
# @see https://trac.ffmpeg.org/wiki/Encode/H.265
ffmpeg -i "$master_video_path" \
  -map_metadata -1 \
  -c:v libx265 -crf 30 \
  -preset veryslow \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -tag:v hvc1 \
  -an \
  "$@" "${master_video_dir}/${master_video_name}.hevc.mp4"
# Generate WebM with VP9
# @see https://trac.ffmpeg.org/wiki/Encode/VP9,
#      https://developers.google.com/media/vp9/settings/vod/#quality
ffmpeg -i "$master_video_path" \
  -map_metadata -1 \
  -c:v libvpx-vp9 -crf 31 -minrate 800K -maxrate 800K -b:v 800K \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$@" "${master_video_dir}/${master_video_name}.webm"
