# UCL COMP0016 2020 Team 20 Blog

This repository contains the source code and blog posts for UCL COMP0016 Team 20 (academic year 2020/2021).

Our team consists of Matthew Schulz, Shubham Jain and Mateusz Zielinski.

## Adding a new post (from Notion)

I've hacked together a quick script that should simplify publishing posts from Notion. Steps:

1. Export the post from Notion as "Markdown + CSV" (no subpages)

2. Unzip the exported folder and paste the contents of the unzipped folder into the [`publisher`](./publisher) folder (so you should now have a markdown file, the javascript file, and possibly a folder of images in the `publisher` folder). Don't rename anything!

3. `cd publisher`

4. `node publish-notion-post.js` and follow the prompts:

   ```
   > node .\publish-notion-post.js
   Is "Week 6 Development, Login Options, and MoSCoW requ c5ac1ee480be4254983883fe20d7be7a.md" the correct blog post to publish? Y/N: Y
   Enter the blog post's publish date in YYYY-MM-DD format: 2020-12-29
   Enter the week number for this blog post: 10
   Done! Double check that the images have been added under images/ and that the new post is in _posts/ with correct title, tags, date, and images!
   ```

5. Make sure everything's been added properly (in particular images), and then delete the markdown file you added in the `publisher` folder -- it will have been automatically copied to the `_posts` folder!

## Adding a new post (manually)

To add a new post manually, follow the steps below:

1. Create a file in [`_posts/`](./_posts) with the filename in the format `YYYY-MM-DD-week-x.md`

2. Add the post metadata at the beginning of the file, like below:

   ```
   ---
   layout: post
   title: "Week x: TITLE
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: development planning
   ---
   ```

3. Make sure any images are linked to `/blog/image-name.png`, and that you've placed the corresponding images under [`images/`](./images).

## Running locally

If you want to run the site locally, follow [GitHub's instructions](https://docs.github.com/en/enterprise/2.13/user/articles/setting-up-your-github-pages-site-locally-with-jekyll).

Once all the dependencies are installed, just run `bundle exec jekyll serve` to start a local server on <localhost:4000> by default.
