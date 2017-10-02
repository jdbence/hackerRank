// Write your Checker class here
class Checker implements Comparator<Player>{
  @Override
  public int compare(Player a, Player b) {
    if(a.score == b.score){
      return a.name.compareToIgnoreCase(b.name);
    }
    return a.score < b.score ? 1 : -1;
  }
}