#! /bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# NOOAs original SOS data server is kinda slow ... only up to 3 Mb/s
# SOS_SERVER=ftp://public.sos.noaa.gov/
# Superfast mirror server at princeton > 10 Mb/s
SOS_SERVER=https://mirror.math.princeton.edu/pub/climatemirror/public.sos.noaa.gov/
# Lots of panorama photos in equirectangular format
KUBI_SERVER=https://www.kubische-panoramen.de/2000/
# Threejs example textures
THREE_SERVER=https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/

BEGIN () {
    NEWDIR="$SCRIPT_DIR/../$@"
    mkdir -p "$NEWDIR"
    pushd $NEWDIR > /dev/null
}

END () {
    popd > /dev/null
}

TITLE () {
    echo ">>> " "$@" "<<<"
}

HEADLINE () {
    echo "--------------------------------------------------------------------------"
    echo "$@" " ..."
    echo "--------------------------------------------------------------------------"
}

WGET() {
    wget -nc "$@"
}

SOS() {
    WGET "$SOS_SERVER$@"
}

KUBI() {
  WGET "$KUBI_SERVER$@"
}

THREE() {
  WGET "$THREE_SERVER$@"
}

YOUTUBE() {
    youtube-dl --user-agent="" -f $1 -o $2 $3
}


CHECK() {
    if ! [ -x "$(command -v $1)" ]; then
      echo "Error: $1 is not installed." >&2
      echo "I recommend installing it via homebrew."
      exit 1
    fi
}

HEADLINE "DOWNLOAD RESOURCES"
CHECK youtube-dl
CHECK wget

HEADLINE "Downloading small globe videos"

BEGIN video/globe/small
TITLE "Moon Phases 512p (5.2 MB)"
WGET https://svs.gsfc.nasa.gov/vis/a000000/a004600/a004675/sos_phases_512p30.mp4
Title "Science on a Sphere: Land Ratio"
SOS land/land_ratio/land_ratio_2048.webm
END

HEADLINE "Downloading 1k globe videos"
BEGIN video/globe/1k
TITLE "Moon Phases 1024p (18.8 MB)"
WGET https://svs.gsfc.nasa.gov/vis/a000000/a004600/a004675/sos_phases_1024p30.mp4
END

HEADLINE "Downloading 2k globe videos"
BEGIN video/globe/2k
TITLE "Global weather October 2018"
YOUTUBE 313 weather-2018-10.webm https://www.youtube.com/watch?v=4HBO0wgWogA
TITLE "Night and Day on Earth"
WGET https://svs.gsfc.nasa.gov/vis/a000000/a004600/a004675/sos_phases_2048p30.mp4
TITLE "Night and Day on the Moon"
SOS land/day_night/oneday/oneday_2048.mp4
TITLE "Air Traffic"
SOS atmosphere/air_traffic/air_traffic_2048.mp4
TITLE "Ocean Flow"
SOS oceans/ecco2_sst/gray_land/ecco2_sst_gray_2048.mp4
END

# HEADLINE "Downloading 4K globe videos (Gigantic!)"
# BEGIN video/globe/4k
# TITLE "Science on a Sphere : Blue Marble Day and Night"
# SOS land/bluemarble_nightlights/bluemarble_nightlights_4096.mp4
# END

HEADLINE "Downloading 1K Science on a Sphere movies"
BEGIN video/globe/1k
TITLE "Science on a Sphere: Cities"
SOS extras/cities/media/cities.webmhd.webm
TITLE "Science on a Sphere: Change"
SOS extras/aop_change/media/change_1024.mp4
END

HEADLINE "Downloading 2K Science on a Sphere movies (huge!)"
BEGIN video/globe/2k
TITLE "Science on a Sphere: Water Falls"
SOS extras/waterfalls/nasa_waterfalls_final_h264.mp4
TITLE "Science on a Sphere: Hot Air"
SOS extras/hot-air/hot-air-2048.mp4
TITLE "Science on a Sphere: Space Geodesy"
WGET  ftp://public.sos.noaa.gov/extras/geodesy/Space_Geodesy.mp4
TITLE "Science on a Sphere: Human Era"
SOS extras/human-era/human-era-2048.mp4
TITLE "Science on a Sphere: Wanderers"
SOS extras/wanderers/wanderers_2048.mp4
TITLE "Science on a Sphere: Goldilocks"
SOS extras/goldilocks/goldilocks_2048.mp4
END

HEADLINE  "Downloading Venue Videos"
BEGIN video/venue
TITLE "Dreams of Dali"
YOUTUBE 266 dreams_of_dali.mp4 https://www.youtube.com/watch?v=F1eLeIocAcU
TITLE "Engineering for Mars: Building the Mars 2020 Mission"
YOUTUBE 315 nasa_jpl_2020.webm https://www.youtube.com/watch?v=2_JJ9gDLwHU
END

HEADLINE  "Downloading Venue Images"
BEGIN img/venue/kubische-panoramen
TITLE "Kubische Panoramen: Wasserturm"
KUBI finow-messingwerk-wasserturm3.jpg
TITLE "Kubische Panoramen: Innenhof"
KUBI forchheim-kaiserpfalz2-hof.jpg
TITLE "Kubische Panoramen: Ruinentheater"
KUBI bayreuth-erimitage-ruinentheater.jpg
TITLE "Kubische Panoramen: Dachboden"
KUBI gentzrode-schloss-haupthaus-dachboden.jpg
TITLE "Kubische Panoramen: Aussichtsturm"
KUBI roseburg-aussichtsturm-innen.jpg
TITLE "Kubische Panoramen: Gruft"
KUBI roseburg-gruft2.jpg
END

# Source: https://www.swr.de/landesschau-rp/mainz-entdecken-ein-virtueller-stadtrundgang-in-360-grad
TITLE "Mainz: Marktplatz und Dom"
BEGIN img/venue/mainz-1
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_0_0_0_0.jpg
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_1_0_0_0.jpg
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_2_0_0_0.jpg
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_3_0_0_0.jpg
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_4_0_0_0.jpg
WGET https://api3-dev.panono.com/5/a93427cbcb285f0ae94784f847bd44eb/tile_5_0_0_0.jpg
END

TITLE "Mainz: Gutemberg Museum"
BEGIN img/venue/mainz-2
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_0_0_0_0.jpg
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_1_0_0_0.jpg
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_2_0_0_0.jpg
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_3_0_0_0.jpg
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_4_0_0_0.jpg
WGET https://api3-dev.panono.com/5/924455950905cafe58de834a0e7499c0/tile_5_0_0_0.jpg
END

TITLE "Mainz: Brücke"
BEGIN img/venue/mainz-3
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_0_0_0_0.jpg
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_1_0_0_0.jpg
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_2_0_0_0.jpg
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_3_0_0_0.jpg
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_4_0_0_0.jpg
WGET https://api3-dev.panono.com/5/58cba1069ac25ba649e635153ba21566/tile_5_0_0_0.jpg
END

HEADLINE "Downloading 1k Globe Imaghes"
BEGIN img/globe/1k
TITLE "1K Moon"
THREE planets/moon_1024.jpg
END

HEADLINE "Downloading 2k Globe Images"
BEGIN img/globe/2k
TITLE "2K Earth without Clouds"
THREE planets/earth_atmos_2048.jpg
TITLE "2K Earth only Clouds"
THREE planets/earth_clouds_2048.png
TITLE "2K Earth at Night"
THREE planets/earth_lights_2048.png
TITLE "2K Earth black & white"
THREE planets/earth_specular_2048.jpg
TITLE "2K Blue Marble"
WGET https://upload.wikimedia.org/wikipedia/commons/c/cd/Land_ocean_ice_2048.jpg
TITLE "2K Mars Color"
WGET https://tharsis.gsfc.nasa.gov/c2880x2160.jpg
TITLE "2K UTM Zones"
WGET https://upload.wikimedia.org/wikipedia/commons/e/ed/Utm-zones.jpg
TITLE "2K Facebook Friends"
SOS extras/facebook/2048.png
TITLE "3K Human Transportation"
SOS extras/human_transportation/anthropocene.png
END
#
# HEADLINE "Downloading 4k Globe images"
#
# BEGIN img/globe/4k
# TITLE "5K NASA Earth Relief"
# WGET https://www.ngdc.noaa.gov/mgg/image/color_etopo1_ice_low.jpg
# TITLE "5K NASA Oceans"
# WGET https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x5400x2700.jpg
# TITLE "Roads"
# SOS overlays/roads/white/4096.png
# END
#
# HEADLINE "Downloading 8k Globe images"
#
# BEGIN img/globe/8k
# TITLE "8K Earth with Clouds"
# WGET http://naturalearth.springercarto.com/ne3_data/8192/textures/1_earth_8k.jpg
# TITLE "8K Earth without Clouds"
# WGET http://naturalearth.springercarto.com/ne3_data/8192/textures/2_no_clouds_8k.jpg
# TITLE "8K Earth at Night"
# WGET http://naturalearth.springercarto.com/ne3_data/8192/textures/5_night_8k.jpg
# TITLE "8K Earth black & white"
# WGET http://naturalearth.springercarto.com/ne3_data/8192/masks/water_8k.png
# END
#
# HEADLINE "Downloading 16k Globe images"
#
# BEGIN img/globe/16k
# TITLE "16K Earth with Clouds"
# WGET http://naturalearth.springercarto.com/ne3_data/16200/textures/1_earth_16k.jpg
# TITLE "16K Earth without Clouds"
# WGET http://naturalearth.springercarto.com/ne3_data/16200/textures/2_no_clouds_16k.jpg
# TITLE "16K Earth at Night"
# WGET http://naturalearth.springercarto.com/ne3_data/16200/textures/5_night_16k.jpg
# TITLE "16K Earth black & white"
# WGET http://naturalearth.springercarto.com/ne3_data/16200/masks/water_16k.png
# TITLE "20K NASA Oceans"
# WGET https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73884/world.topo.bathy.200411.3x21600x10800.png
# END
