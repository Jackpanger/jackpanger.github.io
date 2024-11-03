---
title: 729 My Calendar I
createTime: 2024/10/17 00:10:55
permalink: /guide/coding/questions/729/
tags:
  - Amazon
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/my-calendar-i/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a _double booking_.

A _double booking_ happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendar` class:

- `MyCalendar()` Initializes the calendar object.
- `boolean book(int start, int end)` Returns true if the event can be added to the calendar successfully without causing a _double booking_. Otherwise, return `false` and do not add the event to the calendar.

  :::
  :::: details Solution
  There are several things to note:

  ::: code-tabs
  @tab java

```java
class MyCalendar {
    TreeMap<Integer, Integer> map;

    public MyCalendar() {
        map = new TreeMap<>();
    }

    public boolean book(int start, int end) {
        Integer lower = map.lowerKey(start);
        Integer higher = map.ceilingKey(start);
        if (higher == null) {
            map.put(start, 0);
            map.put(end - 1, 1);
            return true;
        }
        if (lower == null || map.get(lower) == 1) {
            if (higher >= end) {
                map.put(start, 0);
                map.put(end - 1, 1);
                return true;
            }
        }
        return false;
    }
}
```

::::
