package com.chilllover.chillnet.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum NotificationType {
    FOLLOW, LIKE, COMMENT, SHARE, NEW_POST;

    @JsonCreator
    public static NotificationType fromString(String value){
        return NotificationType.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return this.name();
    }
}
