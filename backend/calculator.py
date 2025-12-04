# calculator.py

# Hard-coded material rates (INR for India). Easily updatable.
MATERIAL_RATES = {
    "cement_per_bag": 420.0,
    "sand_per_cft": 65.0, # Using cubic feet as it's common
    "aggregate_per_cft": 55.0, # Using cubic feet as it's common
    "steel_per_kg": 75.0,
    "brick_per_piece": 12.0,
}

# Conversion factor
M3_TO_CFT = 35.3147

def estimate_materials(length, width, height, floors):
    """
    Calculates the estimated quantities and costs of construction materials.
    
    Disclaimer: These calculations are based on general thumb rules for
    preliminary estimation and should not be used for detailed structural design.
    """
    
    # 1. Concrete Calculation (M20 Grade Ratio 1:1.5:3)
    slab_volume = (length * width * 0.15) * floors # 150mm slab thickness
    total_concrete_volume_m3 = slab_volume * 1.35 # Adding 35% for columns, beams etc.
    
    dry_volume_m3 = total_concrete_volume_m3 * 1.54
    
    # Material volumes
    sum_of_ratio = 1 + 1.5 + 3
    cement_volume_m3 = (1 / sum_of_ratio) * dry_volume_m3
    sand_volume_m3 = (1.5 / sum_of_ratio) * dry_volume_m3
    aggregate_volume_m3 = (3 / sum_of_ratio) * dry_volume_m3
    
    # Quantities
    cement_bags = round(cement_volume_m3 / 0.0347)
    sand_cft = round(sand_volume_m3 * M3_TO_CFT)
    aggregate_cft = round(aggregate_volume_m3 * M3_TO_CFT)
    
    # 2. Steel Calculation (1.5% of concrete volume)
    steel_kg = round(total_concrete_volume_m3 * 0.015 * 7850)
    
    # 3. Brick Calculation
    wall_area_m2 = (2 * (length + width) * height * floors) * 0.90 # Deducting 10% for openings
    bricks_count = round(wall_area_m2 / 0.02) # Assuming 50 bricks per m2 for a 9-inch wall

    # 4. Cost Calculation
    costs = {
        "cement": cement_bags * MATERIAL_RATES["cement_per_bag"],
        "sand": sand_cft * MATERIAL_RATES["sand_per_cft"],
        "aggregate": aggregate_cft * MATERIAL_RATES["aggregate_per_cft"],
        "steel": steel_kg * MATERIAL_RATES["steel_per_kg"],
        "bricks": bricks_count * MATERIAL_RATES["brick_per_piece"],
    }
    
    total_cost = sum(costs.values())
    
    return {
        "quantities": {
            "cement_bags": cement_bags,
            "sand_cft": sand_cft,
            "aggregate_cft": aggregate_cft,
            "steel_kg": steel_kg,
            "bricks_count": bricks_count,
        },
        "costs": {k: round(v) for k, v in costs.items()},
        "total_cost": round(total_cost),
    }
