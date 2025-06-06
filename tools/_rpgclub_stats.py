import yaml
from datetime import datetime, timedelta

def load_games_data(filepath='_data/rpgclub.yml'):
    """Load games data from a YAML file."""
    with open(filepath) as file:
        return yaml.safe_load(file)

def calculate_selection_gaps(games_data):
    """Find the game with the longest consecutive months as club game (i.e., longest gap to next selection)."""
    games_sorted = sorted(games_data, key=lambda g: g['date']['select'])
    max_months = 0
    max_game = None
    for i, game in enumerate(games_sorted[:-1]):
        current_date = game['date']['select']
        next_date = games_sorted[i+1]['date']['select']
        months = (next_date.year - current_date.year) * 12 + (next_date.month - current_date.month)
        if months > max_months:
            max_months = months
            max_game = game['name']
    return max_game, max_months if max_game else (None, 0)

def calculate_time_to_selection(games_data):
    """Return a list of dicts with game title and days between release and selection."""
    return [
        {
            "title": game["name"],
            "difference": (game["date"]["select"] - game["date"]["release"]).days
        }
        for game in games_data
    ]

def calculate_games_per_decade(games_data):
    """Return a dict of decade -> count of games released that decade."""
    games_per_decade = {}
    for game in games_data:
        decade = (game["date"]["release"].year // 10) * 10
        games_per_decade[decade] = games_per_decade.get(decade, 0) + 1
    return games_per_decade

def convert_duration(days):
    """Convert a duration in days to a human-readable string (years, months, days)."""
    abs_days = abs(days)
    sign = '-' if days < 0 else ''
    if abs_days >= 365:
        years = abs_days // 365
        unit = "year" if years == 1 else "years"
        return f"{sign}{years} {unit}"
    elif abs_days >= 30:
        months = abs_days // 30
        unit = "month" if months == 1 else "months"
        return f"{sign}{months} {unit}"
    else:
        unit = "day" if abs_days == 1 else "days"
        return f"{sign}{abs_days} {unit}"

def get_median(sorted_list):
    """Return the median element from a sorted list."""
    index = len(sorted_list) // 2
    return sorted_list[index]

def get_average(differences):
    """Return the average value from a list of dicts with 'difference' key."""
    if not differences:
        return 0
    return sum(item["difference"] for item in differences) / len(differences)

def prepare_stats_data(differences_sorted, games_per_decade, games_data):
    """Prepare the statistics dictionary for output to YAML."""
    shortest = differences_sorted[0]
    longest = differences_sorted[-1]
    median_game = get_median(differences_sorted)
    average_duration = get_average(differences_sorted)
    streak_game, streak_count = calculate_selection_gaps(games_data)

    return {
        "shortest_time_to_selection": {
            "title": shortest["title"],
            "duration": convert_duration(shortest["difference"])
        },
        "longest_time_to_selection": {
            "title": longest["title"],
            "duration": convert_duration(longest["difference"])
        },
        "median_game": {
            "title": median_game["title"],
            "duration": convert_duration(median_game["difference"])
        },
        "average_duration": convert_duration(int(round(average_duration))),
        "games_per_decade": games_per_decade,
        "longest_streak": {
            "title": streak_game,
            "value": f"{streak_count} months"
        }
    }

def write_stats_to_yaml(stats_data, filepath='_data/stats.yml'):
    """Write the statistics dictionary to a YAML file."""
    with open(filepath, 'w') as file:
        yaml.dump(stats_data, file, default_flow_style=False)
    print("Stats updated successfully.")

def main():
    games_data = load_games_data()
    differences = calculate_time_to_selection(games_data)
    games_per_decade = calculate_games_per_decade(games_data)
    differences_sorted = sorted(differences, key=lambda x: x["difference"])
    stats_data = prepare_stats_data(differences_sorted, games_per_decade, games_data)
    write_stats_to_yaml(stats_data)

if __name__ == "__main__":
    main()
