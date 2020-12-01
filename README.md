# UCL COMP0016 2020 Team 20 Blog

This repository contains the source code and blog posts for UCL COMP0016 Team 20 (academic year 2020/2021).

Our team consists of Matthew Schulz, Shubham Jain and Mateusz Zielinski.

## Adding a new post

To add a new post, follow the steps below:

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
