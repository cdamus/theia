window.BENCHMARK_DATA = {
  "lastUpdate": 1636779588682,
  "repoUrl": "https://github.com/cdamus/theia",
  "entries": {
    "Performance Benchmarks": [
      {
        "commit": {
          "author": {
            "name": "cdamus",
            "username": "cdamus"
          },
          "committer": {
            "name": "cdamus",
            "username": "cdamus"
          },
          "id": "c245ab8381928e0cc70d48be52f68e4c7ab40111",
          "message": "WIP: Integrate performance tests into the build",
          "timestamp": "2021-11-05T20:06:56Z",
          "url": "https://github.com/cdamus/theia/pull/1/commits/c245ab8381928e0cc70d48be52f68e4c7ab40111"
        },
        "date": 1636735387699,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Browser Frontend Startup",
            "value": 3.9051314999999995,
            "unit": "seconds",
            "range": 0.1688827035970529
          },
          {
            "name": "Electron Frontend Startup",
            "value": 5.325575300000001,
            "unit": "seconds",
            "range": 0.1147149559735345
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "committer": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "distinct": true,
          "id": "a22777e7988043a1dfe4772ba3333531ffab1fa1",
          "message": "Perf history and publication\n\n- track performance history\n- use benchmark action to check for regression\n- publish results to GH Pages\n\nContributed on behalf of STMicroelectronics.\n\nSigned-off-by: Christian W. Damus <give.a.damus@gmail.com>",
          "timestamp": "2021-11-12T11:57:22-05:00",
          "tree_id": "30e47a7ba44c4db170505e011e85ef9eb22f3e9a",
          "url": "https://github.com/cdamus/theia/commit/a22777e7988043a1dfe4772ba3333531ffab1fa1"
        },
        "date": 1636736762361,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Browser Frontend Startup",
            "value": 4.9853698,
            "unit": "seconds",
            "range": 0.46978116717186524
          },
          {
            "name": "Electron Frontend Startup",
            "value": 6.2883984,
            "unit": "seconds",
            "range": 0.2928329189726455
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "committer": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "distinct": true,
          "id": "a22777e7988043a1dfe4772ba3333531ffab1fa1",
          "message": "Perf history and publication\n\n- track performance history\n- use benchmark action to check for regression\n- publish results to GH Pages\n\nContributed on behalf of STMicroelectronics.\n\nSigned-off-by: Christian W. Damus <give.a.damus@gmail.com>",
          "timestamp": "2021-11-12T11:57:22-05:00",
          "tree_id": "30e47a7ba44c4db170505e011e85ef9eb22f3e9a",
          "url": "https://github.com/cdamus/theia/commit/a22777e7988043a1dfe4772ba3333531ffab1fa1"
        },
        "date": 1636738138189,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Browser Frontend Startup",
            "value": 3.8193732,
            "unit": "seconds",
            "range": 0.24254337568187684
          },
          {
            "name": "Electron Frontend Startup",
            "value": 5.1415734,
            "unit": "seconds",
            "range": 0.11766086043132598
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "committer": {
            "email": "give.a.damus@gmail.com",
            "name": "Christian W. Damus",
            "username": "cdamus"
          },
          "distinct": true,
          "id": "e03bfafc5a8a1eb6689373734066ccf31d91c8ab",
          "message": "Perf history and publication\n\n- track performance history\n- use benchmark action to check for regression\n- publish results to GH Pages\n\nContributed on behalf of STMicroelectronics.\n\nSigned-off-by: Christian W. Damus <cdamus.ext@eclipsesource.com>",
          "timestamp": "2021-11-12T12:40:24-05:00",
          "tree_id": "e23acafbbb3d25ef992bd963130fac2a4d4d4ff4",
          "url": "https://github.com/cdamus/theia/commit/e03bfafc5a8a1eb6689373734066ccf31d91c8ab"
        },
        "date": 1636739256614,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Browser Frontend Startup",
            "value": 3.55,
            "unit": "seconds",
            "range": 0.112
          },
          {
            "name": "Electron Frontend Startup",
            "value": 5,
            "unit": "seconds",
            "range": 0.168
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christian W. Damus",
            "username": "cdamus",
            "email": "give.a.damus@gmail.com"
          },
          "committer": {
            "name": "Christian W. Damus",
            "username": "cdamus",
            "email": "give.a.damus@gmail.com"
          },
          "id": "4e782d38bd263f0d7b505a9f8c30b791b16793cb",
          "message": "Integrate performance tests in the build\n\n- update performance scripts to report results for history and regression test\n- configure the build workflow for performance tests\n- track performance history\n- use benchmark action to check for regression\n- publish results to GH Pages\n\nContributed on behalf of STMicroelectronics.\n\nSigned-off-by: Christian W. Damus <cdamus.ext@eclipsesource.com>",
          "timestamp": "2021-11-12T14:06:54Z",
          "url": "https://github.com/cdamus/theia/commit/4e782d38bd263f0d7b505a9f8c30b791b16793cb"
        },
        "date": 1636779585880,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Browser Frontend Startup",
            "value": 4.91,
            "unit": "seconds",
            "range": 0.759
          },
          {
            "name": "Electron Frontend Startup",
            "value": 6.43,
            "unit": "seconds",
            "range": 0.36
          }
        ]
      }
    ]
  }
}