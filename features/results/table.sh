#!/bin/bash

(
  echo "## Rankings"
  echo
  echo "Engines ranked by the number of passing tests:"
  echo
  echo "<table><tr><td>"
  echo
  echo "| Total | Engine |"
  echo "| --- | --- |"
  (for x in *.txt; do printf "| %5d | %-20s |\n" "$(grep ': OK$' "$x" | wc -l)" "${x%.txt}"; done) | sort -nr
  echo
  echo "<td>"
  echo
  echo "| ES1-ES5 | Engine |"
  echo "| --- | --- |"
  (for x in *.txt; do printf "| %5d | %-20s |\n" "$(grep '^es[1-5]/.*: OK$' "$x" | wc -l)" "${x%.txt}"; done) | sort -nr
  echo
  echo "<td>"
  echo
  echo "| ES6 | Engine |"
  echo "| --- | --- |"
  (for x in *.txt; do printf "| %5d | %-20s |\n" "$(grep '^kangax-es6/.*: OK$' "$x" | wc -l)" "${x%.txt}"; done) | sort -nr
  echo
  echo "<td>"
  echo
  echo "| ES2016+ | Engine |"
  echo "| --- | --- |"
  (for x in *.txt; do printf "| %5d | %-20s |\n" "$(grep '^kangax-es20../.*: OK$' "$x" | wc -l)" "${x%.txt}"; done) | sort -nr
  echo
  echo "</tr></table>"
  echo
  echo "## Hard crashes"
  echo
  echo "| Crashes | Engine |"
  echo "| --- | --- |"
  (for x in *.txt; do
    if grep -q ': crashed' "$x"; then
      printf "| %5d | %-20s |\n" "$(grep ': crashed' "$x" | wc -l)" "${x%.txt}";
    fi;
   done) | sort -nr
) | sed 's/|     0 |/|       |/g' >README.md
