---
title: 767. Reorganize String
createTime: 2024/10/13 19:52:17
permalink: /guide/coding/questions/767/
tags:
  - Amazon
---

::: note Question
[Leetcode Link](https://leetcode.com/problems/reorganize-string/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)

Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same.

Return any possible rearrangement of `s` or return `""` if not possible.

**Example 1:**

> **Input**: s = "aab"
> **Output**: "aba"

**Example 2:**

> **Input**: s = "aaab"
> **Output**: ""

**Constraints**:

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.
  :::

:::: details Solution
There are several things to note:

==MaxHeap method:==
::: code-tabs
@tab java

```java

public String reorganizeString(String s) {
    int[] count = new int[26];
    int maxCount = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        count[c - 'a']++;
        maxCount = Math.max(maxCount, count[c - 'a']);
    }
    if (maxCount > (s.length() + 1) / 2) return "";
    PriorityQueue<Character> pq = new PriorityQueue<Character>(new Comparator<Character>() {
        @Override
        public int compare(Character o1, Character o2) {
            return count[o2 - 'a'] - count[o1 - 'a'];
        }
    });
    StringBuilder sb = new StringBuilder();
    for (char i = 'a'; i <= 'z'; i++) {
        if (count[i - 'a'] > 0) pq.offer(i);
    }
    while (pq.size() > 1) {
        Character first = pq.poll();
        Character second = pq.poll();
        sb.append(first);
        sb.append(second);
        count[first - 'a']--;
        count[second - 'a']--;
        if (count[first - 'a'] > 0) {
            pq.offer(first);
        }
        if (count[second - 'a'] > 0) {
            pq.offer(second);
        }
    }
    if (!pq.isEmpty()) {
        sb.append(pq.poll());
    }
    return sb.toString();

}
```

:::
==Greedy method:==
::: code-tabs
@tab java

```java
public String reorganizeString(String s) {
    if (s.length() < 2) {
        return s;
    }
    int[] counts = new int[26];
    int maxCount = 0;
    int length = s.length();
    for (int i = 0; i < length; i++) {
        char c = s.charAt(i);
        counts[c - 'a']++;
        maxCount = Math.max(maxCount, counts[c - 'a']);
    }
    if (maxCount > (length + 1) / 2) {
        return "";
    }
    char[] reorganizeArray = new char[length];
    int evenIndex = 0, oddIndex = 1;
    int halfLength = length / 2;
    for (int i = 0; i < 26; i++) {
        char c = (char) ('a' + i);
        while (counts[i] > 0 && counts[i] <= halfLength && oddIndex < length) {
            reorganizeArray[oddIndex] = c;
            counts[i]--;
            oddIndex += 2;
        }
        while (counts[i] > 0) {
            reorganizeArray[evenIndex] = c;
            counts[i]--;
            evenIndex += 2;
        }
    }
    return new String(reorganizeArray);
}



```

::::
