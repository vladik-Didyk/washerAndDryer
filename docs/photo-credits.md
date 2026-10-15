# Example photos

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

types/laundry-centre.jpg is not added yet: no suitable stock photo; waiting for the Kijiji seller's permission to use his photo of our GE unit. The drawing shows until then, marked "Drawing".
