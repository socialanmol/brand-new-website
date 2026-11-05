#!/bin/bash
# Point the live site tab at the MyAnmol title and the M logo.
# Safe to run more than once. Uses the file Nginx is actually serving.
set -euo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "Run this with sudo."
  exit 1
fi

FAVICON_URL="https://github.com/socialanmol/brand-new-website/raw/cursor/browser-tab-7baa/public/favicon.png"
declare -a CANDIDATES=()

if command -v nginx >/dev/null 2>&1; then
  while IFS= read -r root; do
    [[ -n "$root" ]] && CANDIDATES+=("$root")
  done < <(nginx -T 2>/dev/null | sed -n 's/^[[:space:]]*root[[:space:]]\+\([^;]*\);/\1/p' | sort -u)
fi

while IFS= read -r file; do
  [[ -n "$file" ]] && CANDIDATES+=("$(dirname "$file")")
done < <(find /var/www /usr/share/nginx /home /opt /srv /root -name index.html -type f 2>/dev/null || true)

updated=0
seen=" "
for root in "${CANDIDATES[@]}"; do
  html="$root/index.html"
  [[ -f "$html" ]] || continue
  real=$(readlink -f "$html")
  case "$seen" in
    *" $real "*) continue ;;
  esac
  seen="$seen$real "
  if ! grep -q "Figma Make App\|MyAnmol Share\|MyAnmol - one stop solution for all financial services" "$real"; then
    continue
  fi
  echo "Updating $real"
  sed -i 's/Figma Make App/MyAnmol - one stop solution for all financial services/g; s/MyAnmol Share/MyAnmol - one stop solution for all financial services/g' "$real"
  if ! grep -q 'rel="icon"' "$real"; then
    sed -i 's#</title>#</title>\n    <link rel="icon" href="/favicon.png?v=2">#' "$real"
  fi
  icon="$(dirname "$real")/favicon.png"
  curl -fsSL "$FAVICON_URL" -o "$icon"
  if ! head -c 8 "$icon" | grep -q $'\x89PNG'; then
    echo "The logo download was not a PNG image."
    exit 1
  fi
  chmod 644 "$real" "$icon"
  updated=1
  grep -n 'title\|icon' "$real"
  echo
done

if [[ $updated -eq 0 ]]; then
  echo "Could not find a live index.html for the MyAnmol tab title."
  echo "Folders checked:"
  printf '  %s\n' "${CANDIDATES[@]:-(none)}"
  exit 1
fi

echo "The live tab title is now MyAnmol - one stop solution for all financial services."
echo "Reload http://35.200.200.110"
echo "If the old globe icon is still there, hard-refresh the page."
