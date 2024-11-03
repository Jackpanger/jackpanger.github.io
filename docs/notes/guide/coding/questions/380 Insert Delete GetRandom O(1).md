---
title: 380 Insert Delete GetRandom O(1)
createTime: 2024/10/13 21:11:33
permalink: /guide/coding/questions/380/
tags:
  - Amazon
---

::: note [Question]
[Leetcode Link](https://leetcode.com/problems/insert-delete-getrandom-o1/description/?envType=company&envId=amazon&favoriteSlug=amazon-thirty-days)
Implement the RandomizedSet class:

- `RandomizedSet()` Initializes the `RandomizedSet` object.
- `bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.
- `bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.
- `int getRandom()` Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the **same probability** of being returned.

You must implement the functions of the class such that each function works in **average** `O(1)` time complexity.
:::
:::: details Solution
There are several things to note:

::: code-tabs
@tab java

```java
class RandomizedSet {
    Set<Integer> set;
    List<Integer> list;
    Random random;
    public RandomizedSet() {
        set = new HashSet<Integer>();
        list = new ArrayList<>();
        random = new Random();
    }

    public boolean insert(int val) {
        if (set.contains(val))
            return false;

        set.add(val);
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (set.contains(val)){
            set.remove(val);
            return true;
        }
        return false;
    }

    public int getRandom() {
        int i = random.nextInt(0, list.size());
        Integer integer = list.get(i);
        if (set.contains(integer)){
            return integer;
        }else {
            list.remove(i);
            return getRandom();
        }
    }
}
```

::::
