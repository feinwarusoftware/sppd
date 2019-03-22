# SPPD API v1 - /api/v1

## GET /
### Desc:
Returns api info.

## GET /docs
### Desc:
Returns api docs.

## GET /cards
### Desc:
Returns basic info for all the cards that match the search criteria (see below). Paginated.

### Params:
- name
- theme
- rarity
- orderby (name | energy | rarity)
- order (1 - ascending | -1 - descending)

Note: no point ordering by theme.

Example: /api/v1/cards?theme=adventure&orderby=energy&order=-1

## GET /cards/:id
### Desc:
Returns entire info for a single card.
