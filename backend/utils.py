from difflib import ndiff
from itertools import zip_longest


def highlight_relative_difference(string1, string2):
    if "" in (string1, string2):
        return string1, string2

    res1 = []
    for sign, _, letter in ndiff(string2, string1):
        if sign != " ":
            letter = f"<span class='text-blue-400'>{letter}</span>"
        if sign != "+":
            res1.append(letter)

    res2 = []
    for sign, _, letter in ndiff(string1, string2):
        if sign != " ":
            letter = f"<span class='text-red-400'>{letter}</span>"
        if sign != "+":
            res2.append(letter)

    return "".join(res1), "".join(res2)


def highlight_absolute_differences(string1, string2):
    if string1 == string2:
        return string1, string2

    res1 = []
    res2 = []
    for letter1, letter2 in zip(string1, string2):
        if letter1 != letter2:
            letter1 = f"<span class='text-blue-400'>{letter1}</span>"
            letter2 = f"<span class='text-red-400'>{letter2}</span>"
        res1.append(letter1)
        res2.append(letter2)

    return "".join(res1), "".join(res2)


def date_formater(fields1_values, field2_values):
    return highlight_absolute_differences(
        "/".join(str(x or "").zfill(2) for x in fields1_values),
        "/".join(str(x or "").zfill(2) for x in field2_values),
    )


def name_formatter(fields1_values, field2_values):
    field1_values = (str(x or "").title() for x in fields1_values)
    field2_values = (str(x or "").title() for x in field2_values)

    names1, names2 = zip_longest(
        *(
            highlight_relative_difference(val1, val2)
            for val1, val2 in zip(field1_values, field2_values)
        )
    )

    return " ".join(names1), " ".join(names2)


def default_formatter(fields1_values, field2_values):
    return highlight_absolute_differences(
        " ".join(str(x or "") for x in fields1_values),
        " ".join(str(x or "") for x in field2_values),
    )


PAIRS_FORMATTERS = {"name": name_formatter, "date": date_formater}
