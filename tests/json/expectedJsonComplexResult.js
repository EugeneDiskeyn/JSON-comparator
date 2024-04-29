export const expectedJsonComplexResult = 
`{
    "common": {
        "status": "changedInsides",
        "property": {
            "follow": {
                "status": "added",
                "property": false
            },
            "setting1": {
                "status": "unchanged",
                "property": "Value 1"
            },
            "setting2": {
                "status": "removed",
                "property": 200
            },
            "setting3": {
                "status": "changed",
                "oldProperty": true,
                "property": null
            },
            "setting4": {
                "status": "added",
                "property": "blah blah"
            },
            "setting5": {
                "status": "added",
                "property": {
                    "key5": {
                        "status": "nothing",
                        "property": "value5"
                    }
                }
            },
            "setting6": {
                "status": "changedInsides",
                "property": {
                    "doge": {
                        "status": "changedInsides",
                        "property": {
                            "wow": {
                                "status": "changed",
                                "oldProperty": "",
                                "property": "so much"
                            }
                        }
                    },
                    "key": {
                        "status": "unchanged",
                        "property": "value"
                    },
                    "ops": {
                        "status": "added",
                        "property": "vops"
                    }
                }
            }
        }
    },
    "group1": {
        "status": "changedInsides",
        "property": {
            "baz": {
                "status": "changed",
                "oldProperty": "bas",
                "property": "bars"
            },
            "foo": {
                "status": "unchanged",
                "property": "bar"
            },
            "nest": {
                "status": "changed",
                "property": "str",
                "oldProperty": {
                    "key": "value"
                }
            }
        }
    },
    "group2": {
        "status": "removed",
        "property": {
            "abc": {
                "status": "nothing",
                "property": 12345
            },
            "deep": {
                "status": "nothing",
                "property": {
                    "id": {
                        "status": "nothing",
                        "property": 45
                    }
                }
            }
        }
    },
    "group3": {
        "status": "added",
        "property": {
            "deep": {
                "status": "nothing",
                "property": {
                    "id": {
                        "status": "nothing",
                        "property": {
                            "number": {
                                "status": "nothing",
                                "property": 45
                            }
                        }
                    }
                }
            },
            "fee": {
                "status": "nothing",
                "property": 100500
            }
        }
    }
}`