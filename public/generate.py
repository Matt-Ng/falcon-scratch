print("title:")
title = input()
print("language")
language = input()
print("id")
id = input()
print("content")
content = input()

result = f", \n\"title\": \"{title}\", \n\"language\": \"{language}\", \n\"id\": \"{id}\", \n\"content\": \"{content}\", \n\"leaderboard\": \" {{board: []}} \""
print(result)