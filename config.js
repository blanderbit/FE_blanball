const config = [
    {
        title: "Friends",
        topSide:  [
            "search",
            "add friend",
            "manage friends"
        ],
        tabs: [
            {
                uniqueName: 'friends.online',
                name: 'Зараз у мережі',
                badge: {
                    strategy: [
                        "action",
                        "web socket",
                        "request"
                    ]
                },
                records: {
                    strategy: "infinit",
                    selectable: {
                        actions: ["1", "2", "3"]
                    },
                    preview: [
                        watch
                    ],
                    actions: [
                        {
                            type: "icon"
                        },
                        {
                            type: "text"
                        }
                    ],
                    contextMenu: [
                        {
                            name: 'ff',
                            img: 'ff',
                            action: () => print('im action')
                        }
                    ]
                },
            },
            {
                uniqueName: 'friends.all',
                name: 'Усі друзі'
            },
            {
                uniqueName: 'friends.requests',
                name: 'Запити'
            }
        ],
    }
]