# LalaMovie App — Starter Project

এটি LalaMovie-এর responsive Web App/PWA এবং Android Capacitor wrapper-এর starter source code।

## এখন কী কাজ করছে
- Dark OTT-style responsive homepage
- WordPress REST API থেকে public movie catalogue পড়ার চেষ্টা
- Search, poster cards, details modal
- PWA manifest ও basic offline shell
- Android wrapper-এর Capacitor configuration

## গুরুত্বপূর্ণ সীমাবদ্ধতা
এই starter কোনো সিনেমার ভিডিও ফাইল/স্ট্রিম সরবরাহ করে না। Details থেকে আসল LalaMovie পোস্টে যায়। শুধু আপনার অনুমোদিত/লাইসেন্সকৃত ভিডিও সোর্স যুক্ত করবেন।

আপনার সাইটের WordPress REST API-তে `movies` এবং `tvshows` post type publicভাবে প্রকাশিত থাকতে হবে। API পরীক্ষা করুন:
- https://lalamovie.is-great.net/wp-json/
- https://lalamovie.is-great.net/wp-json/wp/v2/movies?per_page=2&_embed=1

যদি `movies` endpoint 404/401 দেয়, Dooplay-এর post type REST API-তে expose করতে হবে অথবা সাইটের plugin-এ read-only API endpoint তৈরি করতে হবে। TV series post type-ও আপনার সাইটে যে নামে আছে সেটি অনুযায়ী `app.js`-এ বদলাতে হবে।

## Web App চালু করা
1. ZIP extract করুন।
2. ফোল্ডারের ফাইলগুলো ওয়েব হোস্টিংয়ের একটি subfolder-এ upload করুন (যেমন `/app/`)।
3. `app.js`-এর `SITE_URL` আপনার সাইটের সঠিক URL রাখুন।
4. HTTPS-এ খুলুন।

## Android APK তৈরি
প্রয়োজন: Node.js, Android Studio, Android SDK।
1. `npm install`
2. `npm run copy:web`
3. `npx cap add android` (শুধু প্রথমবার)
4. `npx cap sync android`
5. `npx cap open android`
6. Android Studio থেকে Build > Build Bundle(s) / APK(s) > Build APK(s)

## Admin / Movie যোগ করা
এই সংস্করণে নিরাপদভাবে WordPress-এর বিদ্যমান Admin ব্যবহার করা হবে। নতুন Movie যোগ করতে:
`https://lalamovie.is-great.net/wp-admin/post-new.php?post_type=movies`

এটি WordPress লগইন চাইবে। Admin credentials কখনো app-এর JavaScript-এ বসাবেন না। অ্যাপ থেকে আলাদা secure admin add/edit চাইলে server-side authenticated API/plugin লাগবে।

## পরবর্তী integration-এর জন্য দরকার
- `movies` ও TV series-এর REST API endpoint নিশ্চিত করা
- Dooplay-এর genre taxonomy ও player/source fields-এর সঠিক field names
- Admin write API হলে server-side authentication/permissions


## শুধু ফোন দিয়ে APK Build (GitHub Actions)
1. GitHub-এ account খুলুন বা sign in করুন।
2. New repository তৈরি করুন; নাম `lalamovie-app` দিন এবং Public বা Private রাখুন।
3. ZIP extract করে সব ফাইল/ফোল্ডার repository-তে upload করুন। `.github/workflows/android.yml` ফোল্ডারটিও অবশ্যই upload হতে হবে।
4. Commit changes করুন।
5. Repository-এর Actions tab খুলুন। `Build LalaMovie Android APK` workflow নির্বাচন করে `Run workflow` চাপুন (অথবা main branch-এ push করলেই build শুরু হবে)।
6. Build সফল হলে workflow run খুলে নিচের Artifacts থেকে `LalaMovie-debug-apk` ডাউনলোড করুন।
7. ZIP extract করে `app-debug.apk` ফোনে ইনস্টল করুন। Android চাইলে “Install unknown apps” অনুমতি দিন।

এটি debug APK—নিজের ফোনে পরীক্ষা করার জন্য। Play Store বা public release-এর জন্য আলাদা signed release build এবং keystore ব্যবস্থাপনা প্রয়োজন। Keystore/password কখনো repository-তে upload করবেন না।
