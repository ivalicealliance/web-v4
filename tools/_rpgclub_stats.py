import yaml
from datetime import datetime, timedelta
from statistics import median

def load_games_data(filepath='_data/rpgclub.yml'):
    with open(filepath, 'r') as file:
        return yaml.load(file, Loader=yaml.FullLoader)

def calculate_differences_and_decades(games_data):
    differences_with_title = []
    games_per_decade = {}
    
    for game in games_data:
        release_date = game["date"]["release"]
        select_date = game["date"]["select"]
        difference = (select_date - release_date).days
        differences_with_title.append({"title": game["name"], "difference": difference, "release_date": release_date, "select_date": select_date})        
        decade = (release_date.year // 10) * 10
        games_per_decade[decade] = games_per_decade.get(decade, 0) + 1
    
    return differences_with_title, games_per_decade

def convert_duration(days):
    if days > 364:
        years = round(days / 365)
        return f"{years} years"
    elif days > 30:
        months = round(days / 30)
        return f"{months} months"
    else:
        return f"{days} days"

def calculate_stats(differences_with_title):
    median_age_days = median(item["difference"] for item in differences_with_title)
    average_age_days = sum(item["difference"] for item in differences_with_title) / len(differences_with_title)
    return convert_duration(median_age_days), convert_duration(average_age_days)

def prepare_stats_data(differences_sorted, median_age, average_age, games_per_decade):
    shortest = differences_sorted[0]
    longest = differences_sorted[-1]
    return {
        "shortest_time_to_selection": {
            "title": shortest["title"],
            "duration": convert_duration(shortest["difference"])
        },
        "longest_time_to_selection": {
            "title": longest["title"],
            "duration": convert_duration(longest["difference"])
        },
        "median_age": median_age,
        "average_age": average_age,
        "games_per_decade": games_per_decade
    }

def write_stats_to_yaml(stats_data, filepath='_data/stats.yml'):
    with open(filepath, 'w') as file:
        yaml.dump(stats_data, file)
    print("Stats updated successfully.")

def main():
    games_data = load_games_data()
    differences_with_title, games_per_decade = calculate_differences_and_decades(games_data)
    differences_sorted = sorted(differences_with_title, key=lambda x: x["difference"])
    median_age, average_age = calculate_stats(differences_with_title)
    stats_data = prepare_stats_data(differences_sorted, median_age, average_age, games_per_decade)
    write_stats_to_yaml(stats_data)

if __name__ == "__main__":
    main()
