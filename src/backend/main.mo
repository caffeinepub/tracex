import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type Location = {
    lat : Float;
    lng : Float;
    locationLabel : Text;
    timestamp : Int;
  };

  module Location {
    public func compareByLat(location1 : Location, location2 : Location) : Order.Order {
      Float.compare(location1.lat, location2.lat);
    };

    public func compareByLng(location1 : Location, location2 : Location) : Order.Order {
      Float.compare(location1.lng, location2.lng);
    };

    public func compareByTimestamp(location1 : Location, location2 : Location) : Order.Order {
      Int.compare(location1.timestamp, location2.timestamp);
    };
  };

  let locations = Map.empty<Text, Location>();

  public shared ({ caller }) func shareLocation(phone : Text, lat : Float, lng : Float, locationLabel : Text) : async () {
    let location : Location = {
      lat;
      lng;
      locationLabel;
      timestamp = Time.now();
    };
    locations.add(phone, location);
  };

  public query ({ caller }) func getLocation(phone : Text) : async ?Location {
    locations.get(phone);
  };

  public shared ({ caller }) func deleteLocation(phone : Text) : async () {
    if (not locations.containsKey(phone)) { Runtime.trap("Location does not exist for the given phone number.") };
    locations.remove(phone);
  };

  public query ({ caller }) func listLocations() : async [Location] {
    locations.values().toArray();
  };

  public query ({ caller }) func listLocationsByLat() : async [Location] {
    locations.values().toArray().sort(Location.compareByLat);
  };

  public query ({ caller }) func listLocationsByLng() : async [Location] {
    locations.values().toArray().sort(Location.compareByLng);
  };

  public query ({ caller }) func listLocationsSortByTimestamp() : async [Location] {
    locations.values().toArray().sort(Location.compareByTimestamp);
  };
};
