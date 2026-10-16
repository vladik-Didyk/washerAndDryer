# Example photos

Two sources, both free for commercial use without credit: Pexels (below) and Unsplash (the laundry-room photos, further down).

Free stock photos from Pexels, used under the Pexels License (free for commercial use, no attribution required; https://www.pexels.com/license/). Cropped and resized. They show examples of each machine type and a laundry room, not machines GTA Washer & Dryer Rentals owns; the site labels them "Example of this type. Your machine may be a different brand." (the home page photo: "Example photo").

| File | Pexels photo |
|---|---|
| hero/laundry-room.jpg, hero/laundry-room-mobile.jpg, types/side-by-side-front-load-2.jpg | https://www.pexels.com/photo/washing-machines-in-house-17158638/ |
| types/stackable-1.jpg | https://www.pexels.com/photo/interior-of-a-modern-laundry-room-19846397/ |
| types/stackable.jpg | https://www.pexels.com/photo/washing-machine-and-dryer-in-cabinet-7614539/ |
| types/side-by-side-front-load-1.jpg, types/single-machine-dryer.jpg | https://www.pexels.com/photo/modern-laundry-room-with-washer-and-dryer-setup-38525183/ |
| types/side-by-side-front-load.jpg | https://www.pexels.com/photo/front-load-washing-machine-beside-white-window-blinds-3935334/ |
| types/side-by-side-top-load-1.jpg | https://www.pexels.com/photo/bright-laundry-room-with-washer-and-dryer-31602334/ |
| types/side-by-side-top-load-2.jpg | https://www.pexels.com/photo/white-top-load-washing-machine-and-dryer-inside-the-room-10847199/ |
| types/side-by-side-top-load.jpg | https://www.pexels.com/photo/view-of-a-bathroom-5365777/ |
| types/single-machine-washer.jpg | https://www.pexels.com/photo/white-washing-machine-with-beige-towels-19846385/ |
| types/single-machine.jpg | https://www.pexels.com/photo/modern-laundry-room-with-washer-and-dryer-28479466/ |

Paths are under public/photos/. Each JPEG has a same-size WebP and smaller versions next to it (`<name>-600w.jpg` and `.webp`, and so on), made with `pnpm photos` (scripts/make-photo-versions.mjs, needs ImageMagick 7). Run it again after adding or replacing a photo, and commit the new files. Which photos each machine type shows, and their alt text, is set in src/content/machines.js.

types/laundry-centre.jpg, laundry-centre-1.jpg and laundry-centre-2.jpg are Unsplash photos (table below); they replaced the drawing on 2026-10-15.

## Unsplash (added 2026-10-15)

Free photos under the Unsplash License (https://unsplash.com/license: free for commercial use, no permission or credit needed; not for resale as photos). Re-encoded at 1920px on the long edge with the metadata stripped. `rooms/` are home laundry spaces (the home hero slides, the "What's included" cards, the laundry-room carousel, and extra photos on the machine type pages); `shared/` are shared laundry rooms (the carousel on /buildings/ and /landlords/). None shows our machines or a building we serve, and every caption says so. Alt text is in the dictionary's `photos` namespace.

| File | Unsplash photo |
|---|---|
| rooms/black-washer-basket.jpg | https://unsplash.com/photos/aJN7zURQ1Wg |
| rooms/dark-set-laundry-room.jpg | https://unsplash.com/photos/DB45fWkHRDc |
| rooms/drum-empty.jpg | https://unsplash.com/photos/ykivphUagM4 |
| rooms/drum-open-door.jpg | https://unsplash.com/photos/G6ZB_H9482A |
| rooms/grey-set-laundry-room.jpg | https://unsplash.com/photos/l3g-lwee578 |
| rooms/laundry-room-shirts.jpg | https://unsplash.com/photos/R_pCJvo1lNQ |
| rooms/stacked-small-room.jpg | https://unsplash.com/photos/1j2peSGEEOg |
| rooms/washer-basket-sock.jpg | https://unsplash.com/photos/Bpz3PG_v9ks |
| rooms/washer-cabinet-plants.jpg | https://unsplash.com/photos/vkpVPcIBU5U |
| rooms/washer-dryer-shelving.jpg | https://unsplash.com/photos/23coWmkTNSg |
| rooms/washer-shelves.jpg | https://unsplash.com/photos/5cpBWEl6y6c |
| shared/stacked-dryers-row.jpg | https://unsplash.com/photos/EXCroywwrEw |
| shared/stacked-dryers-tiles.jpg | https://unsplash.com/photos/pYpZIOj-KKs |
| shared/washers-and-dryers-rows.jpg | https://unsplash.com/photos/gme2yNIbDe0 |
| shared/washers-row-beige.jpg | https://unsplash.com/photos/iATnCFDGh0Y |
| shared/washers-row-silver.jpg | https://unsplash.com/photos/AsBD_zNgTuE |
| shared/washers-row-wide.jpg | https://unsplash.com/photos/z3QaK44YPYc |
| shared/washers-row-wood-front.jpg | https://unsplash.com/photos/HkfI9i4g3-8 |
| types/laundry-centre.jpg | https://unsplash.com/photos/a-white-machine-in-a-room-u_iAyixU_SU |
| types/laundry-centre-1.jpg | https://unsplash.com/photos/a-washer-and-dryer-in-a-small-room-U6VZOrQinKs |
| types/laundry-centre-2.jpg | https://unsplash.com/photos/a-white-room-with-a-mirror-and-a-washer-FMjIXcyjHqw |
