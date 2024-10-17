---
title: Amazon
createTime: 2024/10/12 09:54:42
permalink: /guide/coding/amazon/
---

## Question 1

::: note Question
There were a large number of orders placed on Amazon Prime Day. The orders are packed and are at the warehouse ready to be delivered. The delivery agent needs to deliver them in as few trips as possible.

In a single trip, the delivery agent can choose packages following either of two rules:

- Choose two packages with the same weight
- Choose three packages with the same weight

Determine the minimum number of trips required to deliver the packages. If it is not possible to deliver all of them, return -1.

**Example**

packageweight = [2, 4, 6, 6, 4, 2, 4]

The agent needs a minimum of 3 trips as shown below. Return 3 as the answer.
<img src="/coding/amazon/question1.png" >
:::
::: details Solution
There are several things to note:

1. If a package does not have the same weight as any other package, then it cannot be delivered.
2. The minimum number of trips for packages with the same weight is $\lfloor w/3\rfloor$. For example, if 5 packages have the same weight, the minimum number of trips for these packages is $\lfloor 5/3 \rfloor = 2$.
3. We can use a hashMap to count the number of packages with the same weight, and then apply the method mentioned above to calculate the minimum number of trips for all packages.
   ::: code-tabs
   @tab java

```java
public static Integer calculateMinimumTrips(List<Integer> packages){
    int trip = 0;
    Map<Integer, Integer> map = new HashMap<>();
    for (Integer aPackage : packages) {
        map.put(aPackage, map.getOrDefault(aPackage, 0) + 1);
    }
    for (Integer value : map.values()) {
        if (value<2) return -1;
        trip += value%3==0?value/3:value/3+1;
    }
    return trip;
}
```

:::

## Question 2

::: note Question
Amazon rewards its new users with a discount coupon that can be applied to their first purchase. Some users create more than one account in order to receive the offer multiple times. It was found that their new usernames are only a permutation of their real names.

For example, if the real usernames of the users are realNames = ["abc", "def"] and the list of all usernames is allNames = ["bca", "abc", "cba", "def"], then the user “abc” must have made multiple accounts as there are three permutations of “abc” in the list of all usernames.

Given an array of realNames and an array allNames of usernames for each account, identify the names of users who created accounts more than once. The goal is to return the array of real names of these users in lexicographical order. If there are no such names, return an array containing only the string “None”.
:::
::: details Solution
There are several things we can notice:

1. Permutations have the same character count
2. We can calculate character count of each name and compare it with real name.
3. Character count can be represented as string to reduce space complexity.

::: code-tabs
@tab java

```java
private static String parse2CharacterCount(String name) {
    int[] chars = new int[26];
    name.chars().forEach(c -> chars[c - 'a']++);
    StringBuilder sb = new StringBuilder();
    for (Integer character : chars) {
        if (character != 0)
            sb.append('a' + character);
    }
    return sb.toString();
}

public static List<String> calculateReplicateNames(List<String> realNames, List<String> allNames) {
    List<String> result = new ArrayList<>();
    Map<String, Integer> map = new HashMap<>();
    allNames.forEach(
            name -> map.put(parse2CharacterCount(name), map.getOrDefault(parse2CharacterCount(name), 0) + 1)
    );
    realNames.forEach(
            name -> {
                String count = parse2CharacterCount(name);
                if (map.containsKey(count) && map.get(count) > 1)
                    result.add(name);
            }
    );
    if (result.isEmpty())
        result.add("None");
    return result;
}
```

:::
