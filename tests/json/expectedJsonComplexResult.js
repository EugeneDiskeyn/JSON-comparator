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
                "property": null,
                "oldProperty": true
            },
            "setting4": {
                "status": "added",
                "property": "blah blah"
            },
            "setting5": {
                "status": "added",
                "property": {
                    "key5": {
                        "status": "cargo",
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
                                "property": "so much",
                                "oldProperty": ""
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
                "property": "bars",
                "oldProperty": "bas"
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
                "status": "cargo",
                "property": 12345
            },
            "deep": {
                "status": "cargo",
                "property": {
                    "id": {
                        "status": "cargo",
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
                "status": "cargo",
                "property": {
                    "id": {
                        "status": "cargo",
                        "property": {
                            "number": {
                                "status": "cargo",
                                "property": 45
                            }
                        }
                    }
                }
            },
            "fee": {
                "status": "cargo",
                "property": 100500
            }
        }
    }
}`