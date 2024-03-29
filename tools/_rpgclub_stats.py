import yaml
from datetime import datetime, timedelta

def load_games_data(filepath='_data/rpgclub.yml'):
    with open(filepath) as file:
        return yaml.safe_load(file)

def calculate_differences(games_data):
    return [
        {
            "title": game["name"], 
            "difference": (game["date"]["select"] - game["date"]["release"]).days
        } 
        for game in games_data
    ]

def calculate_games_per_decade(games_data):
    games_per_decade = {}
    for game in games_data:
        decade = (game["date"]["release"].year // 10) * 10
        games_per_decade[decade] = games_per_decade.get(decade, 0) + 1
    return games_per_decade

def convert_duration(days):
    abs_days = abs(days)
    if abs_days >= 365:
        years = abs_days // 365
        return f"{'-' if days < 0 else ''}{years} years"
    elif abs_days >= 30:
        months = abs_days // 30
        return f"{'-' if days < 0 else ''}{months} months"
    else:
        return f"{'-' if days < 0 else ''}{abs_days} days"

def calculate_median_game(differences_sorted):
    median_index = len(differences_sorted) // 2
    return differences_sorted[median_index]

def calculate_average_duration(differences):
    total_days = sum(item["difference"] for item in differences)
    average_days = total_days / len(differences)
    return average_days

def prepare_stats_data(differences_sorted, games_per_decade):
    shortest, longest = differences_sorted[0], differences_sorted[-1]
    median_game = calculate_median_game(differences_sorted)
    average_duration = calculate_average_duration(differences_sorted)
    
    return {
        "shortest_time_to_selection": {"title": shortest["title"], "duration": convert_duration(shortest["difference"])},
        "longest_time_to_selection": {"title": longest["title"], "duration": convert_duration(longest["difference"])},
        "median_game": {"title": median_game["title"], "duration": convert_duration(median_game["difference"])},
        "average_duration": convert_duration(int(round(average_duration))),
        "games_per_decade": games_per_decade
    }

def write_stats_to_yaml(stats_data, filepath='_data/stats.yml'):
    with open(filepath, 'w') as file:
        yaml.dump(stats_data, file, default_flow_style=False)
    print("Stats updated successfully.")

def main():
    games_data = load_games_data()
    differences = calculate_differences(games_data)
    games_per_decade = calculate_games_per_decade(games_data)
    differences_sorted = sorted(differences, key=lambda x: x["difference"])
    stats_data = prepare_stats_data(differences_sorted, games_per_decade)
    write_stats_to_yaml(stats_data)

if __name__ == "__main__":
    main()
