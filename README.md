# ivalicealliance.net

## Abstract
An open source website for [Ivalice Alliance](https://www.ivalicealliance.net) built using [Bootstrap](https://getbootstrap.com/), [Dart Sass](https://sass-lang.com/dart-sass), and [Jekyll](https://jekyllrb.com/).

## Editing
Edit any HTML or Markdown files. When your changes land on `main`, it will automatically build a new version of the site. The changes will normally be visible within a minute. 

You can also create new files. HTML files can go where it makes most sense (usually root folder)

## Building Locally
### Requirements
- Python 3
- Ruby
- Sass compiler ([Dart Sass](https://sass-lang.com/dart-sass))

### Installation
Run these commands once in your git folder to install Ruby dependencies:

```bash
bundle install
```

For Python dependencies, run:

```bash
python3 tools/_rpg_clubstats.py
```

### Building
When you are ready to build the site, you should run these commands. 

To create or update statistics, run the stats generator:

```bash
python3 tools/_rpg_clubstats.py
```

If you're planning to make content changes, build the site and watch:
```bash
bundle exec jekyll serve --watch
```

If you're planning to make SCSS changes, compile `sass` and watch:
```bash
> sass _scss/main.scss css/main.css --no-source-map --watch
```

Any changes saved will make `Jekyll` build the site locally. The terminal will provide a local server address, typically [localhost:4000](http://localhost:4000).

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
