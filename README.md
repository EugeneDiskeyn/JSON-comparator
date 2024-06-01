<div align="center">

# JSON-comparator

</div>

<div align="center">

## Eugene Diskeyn

</div>

[![Maintainability](https://api.codeclimate.com/v1/badges/8b562c185b8bb1020da4/maintainability)](https://codeclimate.com/github/EugeneDiskeyn/JSON-comparator/maintainability)

## Description

"JSON-comparator" is a programm which allows you to compare two files. Supported extensions are .json, .yaml, .yml. There are three types of output: stilished, plain and JSON.

### Stylished output

    Stylished output will show the result as a tree with theese signes: "*", " ", "+", "-". 

        "*": Means that a property was added relatively to the first file.
        " ": Means that a property is either unchanged or is part of a property, which was added or removed. 
        "+": Means that a property has a new value. Such line has the same property nerby with "-", which shows old property's value.
        "-": Means that a property was removed.

### Plain output

    Plain output will show you a text which will tell you which properties were changed, removed or added.

### JSON output

    JSON output will show json file, containing all the properties from two files with their statuses, which may be copied and then used.